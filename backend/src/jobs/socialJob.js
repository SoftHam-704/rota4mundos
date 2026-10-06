import cron from "node-cron";
import { gerarRascunhos, publicarProximo } from "../modules/social-posts/social-agent.service.js";
import { criarReelDoDia, limparVideosAntigos } from "../modules/social-posts/reel/reel.service.js";
import { registrarRodada } from "../modules/saude/saude.service.js";
import logger from "../config/logger.js";

const TZ = { timezone: "America/Campo_Grande" };

// Agente Publicitário (Instagram). Roda só com 1 nó de API (como o Repórter): com mais nós, publicaria em dobro.
// Cada rodada fica em agent_runs (rota de saúde do Guardião).
/** Uma rodada de rascunhos do Publicitário — usada pelo agendador e por scripts/rodar-agora.mjs. */
export async function rodadaRascunhos() {
    const r = await gerarRascunhos();
    const criados = r.reportagens + r.serie;
    const detalhe = `${r.reportagens} de reportagem, ${r.serie} da série${r.erros.length ? `; erros: ${r.erros.join(" | ").slice(0, 500)}` : ""}`;
    return { resultado: r.erros.length && !criados ? "FALHOU" : criados ? "OK" : "NADA_A_FAZER", detalhe };
}

export function startSocialJob() {
    // 07:30 — depois do Repórter (07:00): reportagens novas viram rascunho; a série completa a fila
    cron.schedule("30 7 * * *", () => registrarRodada("instagram_rascunhos", rodadaRascunhos), TZ);

    // 07:40 — o Reel do dia (a reportagem mais forte das últimas 48 h, com 3 fatos conferidos)
    cron.schedule("40 7 * * *", () => registrarRodada("instagram_reel", async () => {
        const post = await criarReelDoDia();
        return post ? { resultado: "OK", detalhe: `rascunho de Reel ${post.id}` } : { resultado: "NADA_A_FAZER", detalhe: "sem Reel hoje (já existe, ou nenhum artigo com 3 fatos confirmados)" };
    }), TZ);

    // domingo 03:00 — apaga do disco os vídeos de Reels antigos já publicados/rejeitados
    cron.schedule("0 3 * * 0", () => registrarRodada("instagram_limpeza", async () => {
        const n = await limparVideosAntigos();
        return { resultado: n ? "OK" : "NADA_A_FAZER", detalhe: `${n} vídeo(s) apagado(s)` };
    }), TZ);

    // 12:00 — posts com arte; 19:00 — o Reel (sem Reel aprovado, o próximo post). Nada sai sem aprovação.
    // Dois agendamentos separados: não depende do fuso do servidor para saber qual é qual.
    const publicar = (formato) => () => registrarRodada("instagram_publicacao", async () => {
        const r = await publicarProximo(null, { formato });
        logger.info(`Instagram [cron ${formato}]: ${r.publicado ? `publicado ${r.permalink}` : `nada publicado — ${r.motivo}`}`);
        if (r.publicado) return { resultado: "OK", detalhe: `publicado ${r.permalink}` };
        // fila vazia não é falha: é o Hamilton ainda não ter aprovado
        if (/nenhum post aprovado/.test(r.motivo)) return { resultado: "NADA_A_FAZER", detalhe: r.motivo };
        return { resultado: "FALHOU", detalhe: r.motivo };
    });
    cron.schedule("0 12 * * *", publicar("IMAGE"), TZ);
    cron.schedule("0 19 * * *", publicar("REEL"), TZ);

    logger.info("Instagram: agente agendado — rascunhos 07:30, Reel 07:40, publicação 12:00 (arte) e 19:00 (Reel) (America/Campo_Grande)");
}
