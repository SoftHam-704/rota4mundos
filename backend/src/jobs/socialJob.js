import cron from "node-cron";
import { gerarRascunhos, publicarProximo } from "../modules/social-posts/social-agent.service.js";
import { registrarRodada } from "../modules/saude/saude.service.js";
import logger from "../config/logger.js";

const TZ = { timezone: "America/Campo_Grande" };

// Agente Publicitário (Instagram). Roda só com 1 nó de API (como o Repórter): com mais nós, publicaria em dobro.
// Cada rodada fica em agent_runs (rota de saúde do Guardião).
export function startSocialJob() {
    // 07:30 — depois do Repórter (07:00): reportagens novas viram rascunho; a série completa a fila
    cron.schedule("30 7 * * *", () => registrarRodada("instagram_rascunhos", async () => {
        const r = await gerarRascunhos();
        const criados = r.reportagens + r.serie;
        const detalhe = `${r.reportagens} de reportagem, ${r.serie} da série${r.erros.length ? `; erros: ${r.erros.join(" | ").slice(0, 500)}` : ""}`;
        return { resultado: r.erros.length && !criados ? "FALHOU" : criados ? "OK" : "NADA_A_FAZER", detalhe };
    }), TZ);

    // 12:00 e 19:00 — publica o próximo post APROVADO no admin (nada sai sem aprovação)
    cron.schedule("0 12,19 * * *", () => registrarRodada("instagram_publicacao", async () => {
        const r = await publicarProximo();
        logger.info(`Instagram [cron]: ${r.publicado ? `publicado ${r.permalink}` : `nada publicado — ${r.motivo}`}`);
        if (r.publicado) return { resultado: "OK", detalhe: `publicado ${r.permalink}` };
        // fila vazia não é falha: é o Hamilton ainda não ter aprovado
        if (/nenhum post aprovado/.test(r.motivo)) return { resultado: "NADA_A_FAZER", detalhe: r.motivo };
        return { resultado: "FALHOU", detalhe: r.motivo };
    }), TZ);

    logger.info("Instagram: agente agendado — rascunhos 07:30, publicação 12:00 e 19:00 (America/Campo_Grande)");
}
