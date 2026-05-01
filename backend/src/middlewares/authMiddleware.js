import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { ApiResponse } from "../utils/apiResponse.js";
import logger from "../config/logger.js";

/**
 * Middleware de autenticação JWT
 * Valida o token Bearer no header Authorization e anexa o usuário decodificado ao req
 */
export function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return ApiResponse.error(res, "Token de autenticação não informado", 401);
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return ApiResponse.error(res, "Token inválido", 401);
        }

        const decoded = jwt.verify(token, env.JWT_SECRET);

        // Anexa dados do usuário à requisição para uso nos controllers
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
            name: decoded.name,
        };

        next();
    } catch (error) {
        logger.warn("Tentativa de acesso com token inválido", { ip: req.ip });

        if (error.name === "TokenExpiredError") {
            return ApiResponse.error(res, "Token expirado. Faça login novamente.", 401);
        }

        if (error.name === "JsonWebTokenError") {
            return ApiResponse.error(res, "Token inválido", 401);
        }

        return ApiResponse.error(res, "Falha na autenticação", 401);
    }
}

/**
 * Middleware de autorização por roles
 * @param {string[]} allowedRoles - Array de roles permitidas
 */
export function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return ApiResponse.error(res, "Autenticação necessária", 401);
        }

        if (!allowedRoles.includes(req.user.role)) {
            logger.warn("Acesso negado por permissão insuficiente", {
                userId: req.user.id,
                role: req.user.role,
                requiredRoles: allowedRoles,
            });
            return ApiResponse.error(
                res,
                "Você não tem permissão para realizar esta ação",
                403
            );
        }

        next();
    };
}
