import Anthropic from "@anthropic-ai/sdk";
import Parser from "rss-parser";
import { prisma } from "../../config/database.js";
import { env } from "../../config/env.js";
import logger from "../../config/logger.js";

const parser = new Parser({
    timeout: 10000,
    headers: { "User-Agent": "IRIS/1.0 RotaBioceânica (+https://rota4mundos.com.br)" },
});

const RSS_FEEDS = [
    // Brasil
    "https://g1.globo.com/rss/g1/ms/",
    "https://www.campograndenews.com.br/rss.xml",
    "https://correiodoestado.com.br/feed/",
    "https://agenciabrasil.ebc.com.br/rss/geral/feed.xml",
    // Internacional
    "https://www.abc.com.py/rss/",
    "https://www.lanacion.com.ar/arc/outboundfeeds/rss/",
    "https://www.latercera.com/feed/",
];

const KEYWORDS = [
    "rota bioceânica", "corredor bioceânico", "bioceanica", "bioceanico",
    "porto murtinho", "carmelo peralta", "ponte bioceânica",
    "campo grande ms", "mato grosso do sul", "bonito ms",
    "corredor bioceanico", "corredor rodoviário", "rota atlantico pacifico",
    "antofagasta", "mejillones", "iquique", "salta argentina", "tartagal",
    "filadelfia chaco", "mariscal estigarribia",
    "integracion sudamericana", "corredor vial", "paso fronterizo",
];

function matchesKeywords(text) {
    const norm = t => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const haystack = norm(text);
    return KEYWORDS.some(kw => haystack.includes(norm(kw)));
}

function slugify(text) {
    return text
        .toLowerCase()
        .normalize("NFD").replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .slice(0, 80)
        + "-" + Date.now().toString(36);
}

async function getSystemAuthorId() {
    const admin = await prisma.user.findFirst({
        where: { role: "ADMIN", isActive: true },
        orderBy: { createdAt: "asc" },
    });
    return admin?.id || null;
}

/**
 * Core IRIS logic — pode ser chamado pelo controller (HTTP) ou pelo cron job.
 * @param {string} authorId  — UUID do usuário autor dos artigos gerados
 * @param {object} options
 * @param {number} options.autoPublishThreshold — relevância mínima para publicar direto (default 8)
 * @param {number} options.draftThreshold       — relevância mínima para salvar como rascunho (default 6)
 * @param {number} options.maxItems             — máximo de itens a processar (default 10)
 */
export async function runIrisFetch(authorId, options = {}) {
    const {
        autoPublishThreshold = 8,
        draftThreshold       = 6,
        maxItems             = 10,
    } = options;

    if (!env.ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY não configurada");

    const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

    // 1. Fetch feeds em paralelo (fail-safe)
    const feedResults = await Promise.allSettled(
        RSS_FEEDS.map(url =>
            parser.parseURL(url).then(feed => feed.items.slice(0, 20))
        )
    );

    const feedItems = feedResults.flatMap(r => r.status === "fulfilled" ? r.value : []);
    logger.info(`IRIS: ${feedItems.length} itens coletados de ${RSS_FEEDS.length} feeds`);

    // 2. Filtrar por keywords
    const relevant = feedItems.filter(item =>
        matchesKeywords(`${item.title || ""} ${item.contentSnippet || ""}`)
    );

    if (relevant.length === 0) {
        logger.info("IRIS: nenhum item relevante encontrado");
        return { published: 0, drafted: 0, skipped: 0, total: 0 };
    }

    // 3. Deduplicar por título
    const seen = new Set();
    const unique = relevant.filter(item => {
        const key = (item.title || "").toLowerCase().slice(0, 50);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });

    logger.info(`IRIS: ${unique.length} itens únicos relevantes`);

    // 4. Processar com Claude Haiku
    let published = 0, drafted = 0, skipped = 0;

    for (const item of unique.slice(0, maxItems)) {
        try {
            const source = `Título: ${item.title || "(sem título)"}
Data: ${item.pubDate || "recente"}
Resumo: ${(item.contentSnippet || item.content || "").slice(0, 600)}
Link: ${item.link || ""}`;

            const msg = await client.messages.create({
                model: "claude-haiku-4-5-20251001",
                max_tokens: 1400,
                messages: [{
                    role: "user",
                    content: `Você é a IRIS, editora do portal "Rota Bioceânica" — sobre o Corredor Bioceânico Atlântico-Pacífico (Brasil → Paraguai → Argentina → Chile).

Analise esta notícia e responda APENAS com JSON válido (sem markdown, sem blocos de código):

${source}

Retorne exatamente:
{
  "relevance": <inteiro 1-10 — relevância para o Corredor Bioceânico>,
  "category": "<Infraestrutura | Turismo | Economia | Cultura | Meio Ambiente | Política>",
  "title": "<título jornalístico em PT-BR, máx 90 chars>",
  "excerpt": "<resumo factual PT-BR, 1-2 frases, máx 220 chars>",
  "content": "<artigo completo HTML simples (p, strong, h3), 3-5 parágrafos, PT-BR, baseado nos fatos>"
}`,
                }],
            });

            const raw = (msg.content[0]?.text || "").trim();
            const jsonStr = raw.replace(/^```json?\s*/i, "").replace(/\s*```$/i, "").trim();

            let parsed;
            try { parsed = JSON.parse(jsonStr); }
            catch {
                logger.warn(`IRIS: JSON inválido para "${item.title}"`);
                skipped++;
                continue;
            }

            if (!parsed.relevance || parsed.relevance < draftThreshold) {
                skipped++;
                continue;
            }

            // Evitar duplicatas pelo título
            const titlePrefix = (parsed.title || "").trim().slice(0, 55);
            const existing = await prisma.article.findFirst({
                where: { title: { contains: titlePrefix, mode: "insensitive" } },
            });
            if (existing) { skipped++; continue; }

            const status = parsed.relevance >= autoPublishThreshold ? "PUBLISHED" : "DRAFT";

            // Usa a data original da notícia; fallback para agora
            const originalDate = item.pubDate ? new Date(item.pubDate) : new Date();
            const pubDate = isNaN(originalDate.getTime()) ? new Date() : originalDate;

            await prisma.article.create({
                data: {
                    title:       parsed.title,
                    slug:        slugify(parsed.title),
                    excerpt:     parsed.excerpt || null,
                    content:     parsed.content || "<p>Conteúdo em processamento.</p>",
                    status,
                    publishedAt: pubDate,
                    authorId,
                    lang:        "pt",
                    metaTitle:   parsed.title,
                    metaDesc:    parsed.excerpt || null,
                },
            });

            if (status === "PUBLISHED") { published++; logger.info(`IRIS: PUBLICADO — "${parsed.title}" (relevância ${parsed.relevance})`); }
            else                        { drafted++;   logger.info(`IRIS: RASCUNHO  — "${parsed.title}" (relevância ${parsed.relevance})`); }

        } catch (err) {
            logger.warn(`IRIS: erro ao processar "${item.title}"`, { error: err.message });
            skipped++;
        }
    }

    logger.info(`IRIS: concluído — ${published} publicados, ${drafted} rascunhos, ${skipped} ignorados`);
    return { published, drafted, skipped, total: unique.length };
}
