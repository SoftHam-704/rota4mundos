import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { ApiResponse } from "../utils/apiResponse.js";

/**
 * Rate limiter padrão para proteção geral da API
 * Limita a 100 requisições por IP a cada 15 minutos
 */
// Fora da trava: quem está logado na equipe (ADMIN/EDITOR, token conferido — não basta mandar o
// cabeçalho) e o Guardião em /api/saude, que tem chave própria. 05/10/2026: o admin se travou
// sozinho ao gerar rascunhos (a tela consultava o status a cada 5 s durante ~4 min).
function daEquipe(req) {
    if (req.originalUrl.startsWith("/api/saude")) return true;
    const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
    if (!token) return false;
    try {
        return ["ADMIN", "EDITOR"].includes(jwt.verify(token, env.JWT_SECRET).role);
    } catch {
        return false;
    }
}

export const standardLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100,
    skip: daEquipe,
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
