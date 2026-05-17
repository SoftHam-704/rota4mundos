import cron from "node-cron";
import { prisma } from "../config/database.js";
import { runIrisFetch } from "../modules/ai-news/ai-news.service.js";
import logger from "../config/logger.js";

async function getSystemAuthorId() {
    const admin = await prisma.user.findFirst({
        where: { role: "ADMIN", isActive: true },
        orderBy: { createdAt: "asc" },
    });
    return admin?.id || null;
}

export function startAiNewsJob() {
    // Roda todo dia às 07:00 (horário do servidor)
    cron.schedule("0 7 * * *", async () => {
        logger.info("IRIS [cron]: iniciando busca diária de notícias...");

        try {
            const authorId = await getSystemAuthorId();
            if (!authorId) {
                logger.warn("IRIS [cron]: nenhum usuário ADMIN encontrado, abortando");
                return;
            }

            const result = await runIrisFetch(authorId, {
                autoPublishThreshold: 8,
                draftThreshold: 6,
                maxItems: 15,
            });

            logger.info(`IRIS [cron]: concluído — ${result.published} publicados, ${result.drafted} rascunhos, ${result.skipped} ignorados`);
        } catch (err) {
            logger.error("IRIS [cron]: erro na busca diária", { error: err.message });
        }
    }, {
        timezone: "America/Campo_Grande",
    });

    logger.info("IRIS: cron diário agendado para 07:00 (America/Campo_Grande)");
}
