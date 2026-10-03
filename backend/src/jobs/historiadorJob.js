import cron from "node-cron";
import { executarHistoriador } from "../modules/historiador/historiador.service.js";
import { criarPostDeHistoria } from "../modules/social-posts/social-agent.service.js";
import { registrarRodada } from "../modules/saude/saude.service.js";
import logger from "../config/logger.js";

// Agente Historiador: 1 pauta por dia, às 06:00 — antes do Repórter (07:00) e dos rascunhos do
// Instagram (07:30). Fica DESLIGADO até HISTORIADOR_ATIVO=true no servidor.
export function startHistoriadorJob() {
    if (process.env.HISTORIADOR_ATIVO !== "true") {
        logger.info("Historiador: desligado (HISTORIADOR_ATIVO != true)");
        return;
    }
    cron.schedule("0 6 * * *", () => registrarRodada("historiador", async () => {
        const r = await executarHistoriador({ criarPost: criarPostDeHistoria });
        const detalhe = `${r.cidade} — ${r.tema}: ${r.status} (${r.verificados} fatos verificados de ${r.achados}, ${r.fontes} fontes)${r.erroPost ? `; post falhou: ${r.erroPost}` : ""}`;
        logger.info(`Historiador [cron]: ${detalhe}`);
        // pauta descartada por falta de fatos verificados não é falha do agente: é o rigor funcionando
        return { resultado: r.erroPost ? "FALHOU" : "OK", detalhe };
    }), { timezone: "America/Campo_Grande" });
    logger.info("Historiador: agendado para 06:00 (America/Campo_Grande), 1 pauta por dia");
}
