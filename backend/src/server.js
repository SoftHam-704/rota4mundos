import app from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase, disconnectDatabase } from "./config/database.js";
import logger from "./config/logger.js";

const PORT = env.PORT;

// Inicialização do servidor
async function startServer() {
    try {
        // Conecta ao banco de dados antes de iniciar o servidor
        await connectDatabase();

        const server = app.listen(PORT, () => {
            logger.info(`🚀 Servidor rodando na porta ${PORT}`);
            logger.info(`📡 Ambiente: ${env.NODE_ENV}`);
            logger.info(`🔗 URL base: ${env.APP_BASE_URL}`);
        });

        // Graceful shutdown
        const gracefulShutdown = async (signal) => {
            logger.info(`⚠️ Sinal ${signal} recebido. Encerrando servidor...`);

            server.close(async () => {
                await disconnectDatabase();
                logger.info("👋 Servidor encerrado com sucesso");
                process.exit(0);
            });

            // Força encerramento após 10 segundos se não encerrar graciosamente
            setTimeout(() => {
                logger.error("Forçando encerramento do servidor");
                process.exit(1);
            }, 10000);
        };

        process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
        process.on("SIGINT", () => gracefulShutdown("SIGINT"));

        // Tratamento de erros não capturados
        process.on("uncaughtException", (error) => {
            logger.error("Uncaught Exception:", error);
            process.exit(1);
        });

        process.on("unhandledRejection", (reason) => {
            logger.error("Unhandled Rejection:", reason);
        });
    } catch (error) {
        logger.error("❌ Falha ao iniciar o servidor:", error);
        process.exit(1);
    }
}

startServer();
