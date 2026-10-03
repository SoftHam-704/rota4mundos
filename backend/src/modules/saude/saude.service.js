// Saúde dos agentes do RotaBio, para o Guardião da casa comum (IRIS Global).
//
// Desenho combinado com o Supervisor da Frota (recado de 03/10/2026): o sensor mora aqui, o Guardião só
// consulta GET /api/saude/agentes. Cada rodada agendada fica em agent_runs — inclusive a que QUEBROU,
// que antes só deixava uma linha de log que ninguém lia (foi assim que jun–out/2026 passou em silêncio).
//
// A rota informa também o horário ESPERADO de cada agente: se o horário passou e não há rodada, quem
// decide "não rodou" é o Guardião, comparando os dois. "Não rodou" ≠ "rodou e não achou nada".
import { prisma } from "../../config/database.js";
import logger from "../../config/logger.js";
import { CIDADES } from "../social-posts/content/cidades.js";

// Horários dos agendamentos (America/Campo_Grande, UTC−4 o ano todo; MS não tem horário de verão)
export const AGENTES = {
    historiador: { nome: "Historiador", horarios: ["06:00"], ativo: () => process.env.HISTORIADOR_ATIVO === "true" },
    reporter: { nome: "Repórter", horarios: ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"], ativo: () => true },
    instagram_rascunhos: { nome: "Publicitário — rascunhos", horarios: ["07:30"], ativo: () => true },
    instagram_publicacao: { nome: "Publicitário — publicação", horarios: ["12:00", "19:00"], ativo: () => true },
};
const OFFSET_H = -4;

// Pendência = o que os AGENTES produziram desde que entraram no ar e espera decisão do Hamilton.
// Rascunhos de antes disso (maio/junho, do Repórter antigo) ficam no admin mas não contam: alarme que
// fica alto sobre coisa velha ensina a ignorar o alarme.
const INICIO_DOS_AGENTES = new Date("2026-10-02T00:00:00-04:00");
const JANELA_RESOLVIDAS_H = 48;
// Artigo publicado direto pelo Repórter (relevância 8+) nunca foi pendência: só conta como resolvido
// o que ficou em rascunho e mudou de estado depois (updatedAt bem depois de createdAt).
const FOLGA_RESOLUCAO_MS = 5 * 60_000;

const RESOLUCAO_POST = { APPROVED: "aprovado", PUBLISHED: "publicado", REJECTED: "rejeitado", PUBLISHING: "aprovado" };
const RESOLUCAO_ARTIGO = { PUBLISHED: "publicado", ARCHIVED: "arquivado", SCHEDULED: "agendado" };
const AGENTE_DO_POST = { HISTORIA: "historiador", REPORTAGEM: "instagram_rascunhos", CIDADE: "instagram_rascunhos", INFOGRAFICO: "instagram_rascunhos", PODCAST: "instagram_rascunhos" };

async function pendenciasEResolvidas(agora) {
    const desde48h = new Date(agora.getTime() - JANELA_RESOLVIDAS_H * 3600_000);
    const artigosDoHistoriador = new Set((await prisma.pauta.findMany({ where: { articleId: { not: null } }, select: { articleId: true } })).map((p) => p.articleId));
    const agenteDoArtigo = (id) => (artigosDoHistoriador.has(id) ? "historiador" : "reporter");

    const [posts, artigos] = await Promise.all([
        prisma.socialPost.findMany({
            where: { createdAt: { gte: INICIO_DOS_AGENTES }, OR: [{ status: "DRAFT" }, { status: { not: "DRAFT" }, updatedAt: { gte: desde48h } }] },
            select: { id: true, kind: true, status: true, sourceKey: true, createdAt: true, updatedAt: true, approvedAt: true, publishedAt: true, article: { select: { title: true } } },
        }),
        prisma.article.findMany({
            where: { createdAt: { gte: INICIO_DOS_AGENTES }, OR: [{ status: "DRAFT" }, { status: { not: "DRAFT" }, updatedAt: { gte: desde48h } }] },
            select: { id: true, title: true, status: true, createdAt: true, updatedAt: true },
        }),
    ]);

    // título curto e público: o da reportagem/pauta, nunca a legenda do post
    const pautas = Object.fromEntries((await prisma.pauta.findMany({ where: { socialPostId: { in: posts.map((p) => p.id) } }, select: { socialPostId: true, titulo: true } })).map((p) => [p.socialPostId, p.titulo]));
    const nomeCidade = (slug) => CIDADES.find((c) => c.slug === slug)?.nome || slug;
    const tituloDaSerie = (k = "") => {
        const [tipo, slug] = k.split(":");
        if (tipo === "cidade") return `Cidades da Rota — ${nomeCidade(slug)}`;
        if (tipo === "infografico") return `Infográfico — ${nomeCidade(slug)}`;
        return k;
    };
    const tituloDoPost = (p) => pautas[p.id] || p.article?.title || tituloDaSerie(p.sourceKey);

    const pendencias = [
        ...posts.filter((p) => p.status === "DRAFT").map((p) => ({ id: p.id, tipo: "post", agente: AGENTE_DO_POST[p.kind] || "instagram_rascunhos", titulo: tituloDoPost(p), desde: p.createdAt.toISOString(), onde: "admin › Publicações" })),
        ...artigos.filter((a) => a.status === "DRAFT").map((a) => ({ id: a.id, tipo: "artigo", agente: agenteDoArtigo(a.id), titulo: a.title, desde: a.createdAt.toISOString(), onde: "admin › Artigos" })),
    ].sort((a, b) => a.desde.localeCompare(b.desde));

    const resolvidas = [
        ...posts.filter((p) => p.status !== "DRAFT" && RESOLUCAO_POST[p.status]).map((p) => ({ id: p.id, tipo: "post", agente: AGENTE_DO_POST[p.kind] || "instagram_rascunhos", titulo: tituloDoPost(p), resolucao: RESOLUCAO_POST[p.status], em: (p.publishedAt || p.approvedAt || p.updatedAt).toISOString() })),
        ...artigos.filter((a) => a.status !== "DRAFT" && RESOLUCAO_ARTIGO[a.status] && a.updatedAt - a.createdAt > FOLGA_RESOLUCAO_MS).map((a) => ({ id: a.id, tipo: "artigo", agente: agenteDoArtigo(a.id), titulo: a.title, resolucao: RESOLUCAO_ARTIGO[a.status], em: a.updatedAt.toISOString() })),
    ].sort((a, b) => b.em.localeCompare(a.em));

    return { pendencias, resolvidas };
}

/**
 * Executa uma rodada registrando início, fim, resultado e erro.
 * `fn` devolve { resultado: "OK" | "NADA_A_FAZER" | "FALHOU", detalhe }; exceção vira FALHOU.
 * Nunca lança: o agendamento não pode cair por causa do registro.
 */
export async function registrarRodada(agente, fn) {
    let rodada = null;
    try { rodada = await prisma.agentRun.create({ data: { agente } }); }
    catch (e) { logger.error(`Saúde: não consegui registrar o início da rodada de ${agente}`, { erro: e.message }); }

    let fim;
    try {
        const r = await fn();
        fim = { resultado: r?.resultado || "OK", detalhe: r?.detalhe?.slice(0, 1000) || null, erro: null };
    } catch (e) {
        fim = { resultado: "FALHOU", detalhe: null, erro: String(e.message || e).slice(0, 2000) };
        logger.error(`${AGENTES[agente]?.nome || agente}: rodada falhou`, { erro: fim.erro });
    }

    if (rodada) {
        // gravação condicional por id: vai ao nó principal, sem depender da réplica
        await prisma.agentRun.update({ where: { id: rodada.id }, data: { ...fim, terminadoEm: new Date() } })
            .catch((e) => logger.error(`Saúde: não consegui registrar o fim da rodada de ${agente}`, { erro: e.message }));
    }
    return fim;
}

// "HH:MM" de Campo Grande → instantes UTC de hoje/ontem/amanhã
function instantes(horarios, agora) {
    const base = new Date(agora.getTime() + OFFSET_H * 3600_000); // relógio de Campo Grande
    const out = [];
    for (const dia of [-1, 0, 1]) {
        for (const hm of horarios) {
            const [h, m] = hm.split(":").map(Number);
            const d = Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate() + dia, h - OFFSET_H, m);
            out.push(new Date(d));
        }
    }
    return out.sort((a, b) => a - b);
}

export async function saudeDosAgentes(agora = new Date()) {
    const agentes = {};
    for (const [chave, cfg] of Object.entries(AGENTES)) {
        const ultima = await prisma.agentRun.findFirst({ where: { agente: chave }, orderBy: { iniciadoEm: "desc" } });
        const t = instantes(cfg.horarios, agora);
        agentes[chave] = {
            nome: cfg.nome,
            ativo: cfg.ativo(),
            horarios: cfg.horarios,
            fuso: "America/Campo_Grande",
            ultima_esperada: t.filter((d) => d <= agora).at(-1)?.toISOString() || null,
            proxima: t.find((d) => d > agora)?.toISOString() || null,
            ultima_execucao: ultima?.iniciadoEm?.toISOString() || null,
            terminou_em: ultima?.terminadoEm?.toISOString() || null,
            resultado: ultima ? ultima.resultado.toLowerCase() : null,
            detalhe: ultima?.detalhe || null,
            erro: ultima?.erro || null,
        };
    }

    const { pendencias, resolvidas } = await pendenciasEResolvidas(agora);
    const postsComErro = await prisma.socialPost.count({ where: { status: "FAILED" } });
    const tokenRenovado = (await prisma.siteSetting.findUnique({ where: { key: "ig_token_renovado_em" } }))?.value || null;

    return {
        projeto: "RotaBio — Rota 4 Mundos",
        gerado_em: agora.toISOString(),
        agentes,
        // contagem compatível com o card atual — agora só pendências reais (desde 02/10/2026)
        aguardando_aprovacao: { instagram: pendencias.filter((p) => p.tipo === "post").length, artigos: pendencias.filter((p) => p.tipo === "artigo").length },
        // para dar baixa pelo id: some de "pendencias" e aparece em "resolvidas" (últimas 48h)
        pendencias,
        resolvidas,
        pendencias_desde: INICIO_DOS_AGENTES.toISOString(),
        instagram: { posts_com_erro: postsComErro, token_renovado_em: tokenRenovado },
    };
}
