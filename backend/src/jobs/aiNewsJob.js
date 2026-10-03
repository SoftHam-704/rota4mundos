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

export function startAiNewsJob() {
    // Roda todo dia às 07:00 (America/Campo_Grande)
    cron.schedule("0 7 * * *", () => registrarRodada("reporter", async () => {
        logger.info("Repórter [cron]: iniciando busca diária de notícias...");
        const authorId = await getSystemAuthorId();
        if (!authorId) throw new Error("nenhum usuário ADMIN ativo para assinar as reportagens");

        const result = await runIrisFetch(authorId, { autoPublishThreshold: 8, draftThreshold: 6, maxItems: 15 });
        const detalhe = `${result.published} publicadas, ${result.drafted} rascunhos, ${result.skipped} ignoradas${result.errors ? `, ${result.errors} erros` : ""} (de ${result.total} notícias únicas)`;
        logger.info(`Repórter [cron]: concluído — ${detalhe}`);
        return { resultado: result.published + result.drafted > 0 ? "OK" : "NADA_A_FAZER", detalhe };
    }), { timezone: "America/Campo_Grande" });

    logger.info("Repórter: cron diário agendado para 07:00 (America/Campo_Grande)");
}
