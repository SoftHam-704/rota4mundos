import logger from "../config/logger.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

/**
 * Middleware centralizado de tratamento de erros
 * Captura todas as exceções e responde de forma padronizada
 */
export function errorMiddleware(err, req, res, next) {
    // Log do erro com contexto
    logger.error("Erro na requisição", {
        error: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        ip: req.ip,
        userId: req.user?.id,
    });

    // Erros de validação do Zod
    if (err instanceof ZodError) {
        const formattedErrors = err.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
        }));
        return ApiResponse.error(res, "Dados inválidos", 400, formattedErrors);
    }

    // Erros únicos do Prisma (ex: email duplicado)
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // Código P2002 = violação de constraint única
        if (err.code === "P2002") {
            const field = err.meta?.target?.[0] || "campo";
            return ApiResponse.error(res, `${field} já está em uso`, 409);
        }

        // Código P2025 = registro não encontrado
        if (err.code === "P2025") {
            return ApiResponse.error(res, "Registro não encontrado", 404);
        }

        return ApiResponse.error(res, "Erro no banco de dados", 500);
    }

    // Erros de validação do Prisma
    if (err instanceof Prisma.PrismaClientValidationError) {
        return ApiResponse.error(res, "Dados inválidos para o banco de dados", 400);
    }

    // Erro de JWT
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
        return ApiResponse.error(res, "Token inválido ou expirado", 401);
    }

    // Erro genérico - não expor detalhes em produção
    const message =
        process.env.NODE_ENV === "production"
            ? "Erro interno do servidor"
            : err.message || "Erro interno do servidor";

    return ApiResponse.error(res, message, err.statusCode || 500);
}

/**
 * Middleware para rotas não encontradas (404)
 */
export function notFoundMiddleware(req, res) {
    logger.warn(`Rota não encontrada: ${req.method} ${req.path}`, { ip: req.ip });
    return ApiResponse.error(res, `Rota ${req.path} não encontrada`, 404);
}
