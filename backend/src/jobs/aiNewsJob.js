import cron from "node-cron";
import { prisma } from "../config/database.js";
import { runIrisFetch } from "../modules/ai-news/ai-news.service.js";
import { registrarRodada } from "../modules/saude/saude.service.js";
import logger from "../config/logger.js";

// "Repórter": o agente de notícias. Nasceu chamado IRIS, quando a IRIS da casa ainda era um sonho;
// para pessoas (logs, telas) agora é Repórter. Nomes internos (runIrisFetch, ai-news) ficam.

async function getSystemAuthorId() {
    const admin = await prisma.user.findFirst({
        where: { role: "ADMIN", isActive: true },
        orderBy: { createdAt: "asc" },
    });
    return admin?.id || null;
}

export const CRON_REPORTER = "0 6-22/2 * * *";

export function startAiNewsJob() {
    // A cada 2 horas, das 06:00 às 22:00 (America/Campo_Grande) — o Repórter trabalha bem mais que o
    // Publicitário (pedido do Hamilton, 03/10). Os horários estão também em saude.service.js (AGENTES).
    cron.schedule(CRON_REPORTER, () => registrarRodada("reporter", async () => {
        logger.info("Repórter [cron]: iniciando rodada de notícias...");
        const authorId = await getSystemAuthorId();
        if (!authorId) throw new Error("nenhum usuário ADMIN ativo para assinar as reportagens");

        const result = await runIrisFetch(authorId, { autoPublishThreshold: 8, draftThreshold: 6, maxItems: 25 });
        const paises = Object.entries(result.porPais || {}).map(([p, n]) => `${p} ${n}`).join(", ");
        const detalhe = `${result.published} publicadas, ${result.drafted} rascunhos, ${result.skipped} ignoradas, ${result.descartadosTriagem || 0} descartadas na triagem, ${result.repetidas || 0} repetidas${result.errors ? `, ${result.errors} erros` : ""} (de ${result.total} notícias novas)${paises ? ` — ${paises}` : ""}`;
        logger.info(`Repórter [cron]: concluído — ${detalhe}`);
        return { resultado: result.published + result.drafted > 0 ? "OK" : "NADA_A_FAZER", detalhe };
    }), { timezone: "America/Campo_Grande" });

    logger.info("Repórter: agendado a cada 2h, 06:00–22:00 (America/Campo_Grande)");
}
