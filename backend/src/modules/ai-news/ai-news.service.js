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
    // Google News — buscas diretas pelo tema (mais assertivo)
    "https://news.google.com/rss/search?q=corredor+bioce%C3%A2nico&hl=pt-BR&gl=BR&ceid=BR:pt-419",
    "https://news.google.com/rss/search?q=rota+bioce%C3%A2nica&hl=pt-BR&gl=BR&ceid=BR:pt-419",
    "https://news.google.com/rss/search?q=porto+murtinho+corredor&hl=pt-BR&gl=BR&ceid=BR:pt-419",
    "https://news.google.com/rss/search?q=corredor+bioceanico&hl=es&gl=PY&ceid=PY:es-419",
    // Brasil — feeds gerais (complemento)
    "https://g1.globo.com/rss/g1/ms/",
    "https://www.campograndenews.com.br/rss.xml",
    "https://correiodoestado.com.br/feed/",
    "https://agenciabrasil.ebc.com.br/rss/geral/feed.xml",
    // Internacional
    "https://www.abc.com.py/rss/",
    "https://www.lanacion.com.ar/arc/outboundfeeds/rss/",
    "https://www.latercera.com/feed/",
];

// Pré-filtro amplo — Claude faz a triagem real de relevância
const KEYWORDS = [
    // Nomes da rota (cobre todas variantes pt/es com/sem acento após normalização)
    "biocean",           // bioceânica, bioceânico, bioceanica, bioceanico, bioceánico
    "rota 4 mundos",
    "rota atlantico",
    "corredor atlantico",
    "atlantico pacifico",
    // Infraestrutura específica
    "porto murtinho",
    "ponte bioce",
    "ponte de porto murtinho",
    // Cidades-chave do corredor
    "carmelo peralta",
    "filadelfia chaco",
    "mariscal estigarribia",
    "paso de jama",
    "mejillones",
    // Termos de integração regional
    "integracion bioceanica",
    "corredor vial bioceanico",
    // Fronteira MS/PY
    "bela vista ms",
    "ponta pora fronteira",
];

const norm = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function matchesKeywords(text) {
    const haystack = norm(text);
    return KEYWORDS.some((kw) => haystack.includes(norm(kw)));
}

function slugify(text) {
    return (
        norm(text)
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-")
            .slice(0, 80) +
        "-" +
        Date.now().toString(36)
    );
}

async function getSystemAuthorId() {
    const admin = await prisma.user.findFirst({
        where: { role: "ADMIN", isActive: true },
        orderBy: { createdAt: "asc" },
    });
    return admin?.id || null;
}

/**
 * Core IRIS logic — chamado pelo controller (HTTP) ou pelo cron job.
 * @param {string} authorId
 * @param {object} options
 * @param {number} options.autoPublishThreshold — relevância mínima para publicar direto (default 8)
 * @param {number} options.draftThreshold       — relevância mínima para salvar como rascunho (default 6)
 * @param {number} options.maxItems             — máximo de itens a processar (default 10)
 */
export async function runIrisFetch(authorId, options = {}) {
    const { autoPublishThreshold = 8, draftThreshold = 6, maxItems = 10 } = options;

    if (!env.ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY não configurada");

    const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

    // 1. Fetch feeds em paralelo (fail-safe)
    const feedResults = await Promise.allSettled(
        RSS_FEEDS.map((url) => parser.parseURL(url).then((feed) => feed.items.slice(0, 20)))
    );

    const feedItems = feedResults.flatMap((r) => (r.status === "fulfilled" ? r.value : []));
    logger.info(`IRIS: ${feedItems.length} itens coletados de ${RSS_FEEDS.length} feeds`);

    // 2. Pré-filtrar por keywords
    const relevant = feedItems.filter((item) =>
        matchesKeywords(`${item.title || ""} ${item.contentSnippet || ""}`)
    );

    if (relevant.length === 0) {
        logger.info("IRIS: nenhum item relevante encontrado nos feeds");
        return { published: 0, drafted: 0, skipped: 0, total: 0 };
    }

    // 3. Deduplicar: mesma data + primeiras 2 palavras significativas = mesma notícia
    const seen = new Set();
    const unique = relevant.filter((item) => {
        const day = item.pubDate
            ? new Date(item.pubDate).toISOString().slice(0, 10)
            : "nodate";
        const words = norm(item.title || "")
            .replace(/[^a-z0-9\s]/g, "")
            .split(/\s+/)
            .filter((w) => w.length > 2)
            .slice(0, 2)
            .join(" ");
        const key = `${day}:${words}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });

    logger.info(`IRIS: ${unique.length} itens únicos passaram pelo pré-filtro`);

    // 4. Processar com Claude Haiku (triagem e geração de artigo)
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
                messages: [
                    {
                        role: "user",
                        content: `Você é a IRIS, editora do portal "Rota Bioceânica" — sobre o Corredor Bioceânico Atlântico-Pacífico (Brasil → Paraguai → Argentina → Chile).

Avalie se a notícia trata DIRETAMENTE do Corredor Bioceânico, suas obras, comércio ou cidades específicas da rota (Porto Murtinho, Carmelo Peralta, Filadelfia, Mariscal Estigarribia, Paso de Jama, Mejillones).

NÃO é relevante (relevância ≤ 4):
- Notícias gerais do Mato Grosso do Sul sem relação com o Corredor
- Acidentes, crimes, catástrofes climáticas (granizo, enchentes, etc.)
- Casos trabalhistas ou judiciais sem conexão com o Corredor
- Logística genérica, transporte sem citar a Rota Bioceânica
- Política estadual/municipal desconectada do Corredor
- Turismo genérico fora do eixo da Rota

É relevante (relevância ≥ 7) quando:
- Cita explicitamente "Corredor Bioceânico", "Rota Bioceânica" ou "ponte de Porto Murtinho"
- Trata de obras, investimentos, acordos diplomáticos no eixo BR-PY-AR-CL
- Envolve comércio ou exportação especificamente pela rota do Corredor

Responda APENAS com JSON válido (sem markdown):

${source}

{
  "relevance": <inteiro 1-10>,
  "category": "<Infraestrutura | Turismo | Economia | Cultura | Meio Ambiente | Política>",
  "title": "<título jornalístico PT-BR, máx 90 chars>",
  "excerpt": "<resumo factual PT-BR, 1-2 frases, máx 220 chars>",
  "content": "<artigo HTML simples (p, strong, h3), 3-5 parágrafos, PT-BR, baseado nos fatos>"
}`,
                    },
                ],
            });

            const raw = (msg.content[0]?.text || "").trim();
            const jsonStr = raw.replace(/^```json?\s*/i, "").replace(/\s*```$/i, "").trim();

            let parsed;
            try {
                parsed = JSON.parse(jsonStr);
            } catch {
                logger.warn(`IRIS: JSON inválido para "${item.title}"`);
                skipped++;
                continue;
            }

            if (!parsed.relevance || parsed.relevance < draftThreshold) {
                logger.info(`IRIS: ignorado — "${item.title}" (relevância ${parsed.relevance ?? "?"}})`);
                skipped++;
                continue;
            }

            // Evitar duplicatas pelo título
            const titlePrefix = (parsed.title || "").trim().slice(0, 55);
            const existing = await prisma.article.findFirst({
                where: { title: { contains: titlePrefix, mode: "insensitive" } },
            });
            if (existing) {
                skipped++;
                continue;
            }

            const status = parsed.relevance >= autoPublishThreshold ? "PUBLISHED" : "DRAFT";

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

            if (status === "PUBLISHED") {
                published++;
                logger.info(`IRIS: PUBLICADO — "${parsed.title}" (relevância ${parsed.relevance})`);
            } else {
                drafted++;
                logger.info(`IRIS: RASCUNHO  — "${parsed.title}" (relevância ${parsed.relevance})`);
            }
        } catch (err) {
            logger.warn(`IRIS: erro ao processar "${item.title}"`, { error: err.message });
            skipped++;
        }
    }

    logger.info(`IRIS: concluído — ${published} publicados, ${drafted} rascunhos, ${skipped} ignorados`);
    return { published, drafted, skipped, total: unique.length };
}
