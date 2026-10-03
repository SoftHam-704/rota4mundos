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

// Horários dos agendamentos (America/Campo_Grande, UTC−4 o ano todo; MS não tem horário de verão)
export const AGENTES = {
    historiador: { nome: "Historiador", horarios: ["06:00"], ativo: () => process.env.HISTORIADOR_ATIVO === "true" },
    reporter: { nome: "Repórter", horarios: ["07:00"], ativo: () => true },
    instagram_rascunhos: { nome: "Publicitário — rascunhos", horarios: ["07:30"], ativo: () => true },
    instagram_publicacao: { nome: "Publicitário — publicação", horarios: ["12:00", "19:00"], ativo: () => true },
};
const OFFSET_H = -4;

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

    const [postsAguardando, artigosAguardando, postsComErro] = await Promise.all([
        prisma.socialPost.count({ where: { status: "DRAFT" } }),
        prisma.article.count({ where: { status: "DRAFT" } }),
        prisma.socialPost.count({ where: { status: "FAILED" } }),
    ]);
    const tokenRenovado = (await prisma.siteSetting.findUnique({ where: { key: "ig_token_renovado_em" } }))?.value || null;

    return {
        projeto: "RotaBio — Rota 4 Mundos",
        gerado_em: agora.toISOString(),
        agentes,
        aguardando_aprovacao: { instagram: postsAguardando, artigos: artigosAguardando },
        instagram: { posts_com_erro: postsComErro, token_renovado_em: tokenRenovado },
    };
}
