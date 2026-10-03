import cron from "node-cron";
import { executarHistoriador } from "../modules/historiador/historiador.service.js";
import { criarPostDeHistoria } from "../modules/social-posts/social-agent.service.js";
import logger from "../config/logger.js";

// Agente Historiador: 1 pauta por dia, às 06:00 — antes da coleta de notícias (07:00) e dos
// rascunhos do Instagram (07:30). Fica DESLIGADO até HISTORIADOR_ATIVO=true no servidor.
export function startHistoriadorJob() {
    if (process.env.HISTORIADOR_ATIVO !== "true") {
        logger.info("Historiador: desligado (HISTORIADOR_ATIVO != true)");
        return;
    }
    cron.schedule("0 6 * * *", async () => {
        try {
            const r = await executarHistoriador({ criarPost: criarPostDeHistoria });
            logger.info(`Historiador [cron]: ${r.cidade} — ${r.tema}: ${r.status} (${r.verificados} fatos verificados)`);
        } catch (e) {
            logger.error("Historiador [cron]: rodada falhou", { erro: e.message });
        }
    }, { timezone: "America/Campo_Grande" });
    logger.info("Historiador: agendado para 06:00 (America/Campo_Grande), 1 pauta por dia");
}
