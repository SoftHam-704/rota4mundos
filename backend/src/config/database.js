import { PrismaClient } from "@prisma/client";

// Instância única do Prisma Client para toda a aplicação
export const prisma = new PrismaClient({
    log:
        process.env.NODE_ENV === "development"
            ? ["query", "info", "warn", "error"]
            : ["error"],
});

// Conecta ao banco de dados com tratamento de erros
export async function connectDatabase() {
    try {
        await prisma.$connect();
        console.log("✅ Conexão com PostgreSQL estabelecida com sucesso");
    } catch (error) {
        console.error("❌ Erro ao conectar ao banco de dados:", error.message);
        process.exit(1);
    }
}

// Desconecta graceful shutdown
export async function disconnectDatabase() {
    await prisma.$disconnect();
    console.log("🔌 Conexão com banco de dados encerrada");
}
