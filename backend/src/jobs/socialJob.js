import cron from "node-cron";
import { gerarRascunhos, publicarProximo } from "../modules/social-posts/social-agent.service.js";
import logger from "../config/logger.js";

const TZ = { timezone: "America/Campo_Grande" };

// Agente do Instagram. Roda só com 1 nó de API (como a IRIS): com mais nós, publicaria em dobro.
export function startSocialJob() {
    // 07:30 — depois da IRIS (07:00): reportagens novas viram rascunho; a série completa a fila
    cron.schedule("30 7 * * *", () => {
        gerarRascunhos().catch((e) => logger.error("Instagram [cron]: geração falhou", { erro: e.message }));
    }, TZ);

    // 12:00 e 19:00 — publica o próximo post APROVADO no admin (nada sai sem aprovação)
    cron.schedule("0 12,19 * * *", async () => {
        try {
            const r = await publicarProximo();
            logger.info(`Instagram [cron]: ${r.publicado ? `publicado ${r.permalink}` : `nada publicado — ${r.motivo}`}`);
        } catch (e) {
            logger.error("Instagram [cron]: publicação falhou", { erro: e.message });
        }
    }, TZ);

    logger.info("Instagram: agente agendado — rascunhos 07:30, publicação 12:00 e 19:00 (America/Campo_Grande)");
}
