import rateLimit from "express-rate-limit";
import { ApiResponse } from "../utils/apiResponse.js";

/**
 * Rate limiter padrão para proteção geral da API
 * Limita a 100 requisições por IP a cada 15 minutos
 */
export const standardLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        return ApiResponse.error(
            res,
            "Muitas requisições. Tente novamente mais tarde.",
            429
        );
    },
});

/**
 * Rate limiter estrito para endpoints de autenticação
 * Previne ataques de força bruta em login e cadastro
 */
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    handler: (req, res) => {
        return ApiResponse.error(
            res,
            "Muitas tentativas de login. Aguarde 15 minutos.",
            429
        );
    },
});

/**
 * Rate limiter para upload de arquivos
 */
export const uploadLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        return ApiResponse.error(
            res,
            "Limite de uploads atingido. Tente novamente em 1 hora.",
            429
        );
    },
});
