import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { prisma } from "../../config/database.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import logger from "../../config/logger.js";

/**
 * Gera um token JWT com os dados do usuário
 */
function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        },
        env.JWT_SECRET,
        { expiresIn: env.JWT_EXPIRES_IN }
    );
}

/**
 * Registra um novo usuário
 * POST /api/auth/register
 */
export const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Verifica se email já existe
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return ApiResponse.error(res, "Este email já está cadastrado", 409);
    }

    // Hash da senha com salt round 12
    const passwordHash = await bcrypt.hash(password, 12);

    // Cria o usuário
    const user = await prisma.user.create({
        data: {
            name,
            email,
            passwordHash,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });

    // Gera token JWT
    const token = generateToken(user);

    logger.info("Novo usuário registrado", { userId: user.id, email: user.email });

    return ApiResponse.success(
        res,
        { user, token },
        "Usuário registrado com sucesso",
        201
    );
});

/**
 * Realiza login do usuário
 * POST /api/auth/login
 */
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Busca usuário pelo email
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user || !user.isActive) {
        return ApiResponse.error(res, "Email ou senha incorretos", 401);
    }

    // Verifica a senha
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
        return ApiResponse.error(res, "Email ou senha incorretos", 401);
    }

    // Atualiza último login
    await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
    });

    // Remove passwordHash do objeto antes de retornar
    const { passwordHash, ...userWithoutPassword } = user;
    const token = generateToken(user);

    logger.info("Usuário autenticado", { userId: user.id });

    return ApiResponse.success(res, { user: userWithoutPassword, token }, "Login realizado com sucesso");
});

/**
 * Retorna os dados do usuário autenticado
 * GET /api/auth/me
 */
export const getMe = asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            avatarUrl: true,
            createdAt: true,
            lastLoginAt: true,
        },
    });

    if (!user) {
        return ApiResponse.error(res, "Usuário não encontrado", 404);
    }

    return ApiResponse.success(res, user);
});

/**
 * Solicita recuperação de senha
 * POST /api/auth/forgot-password
 */
export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
        where: { email },
    });

    // Mesmo se o usuário não existir, retorna sucesso para não expor emails cadastrados
    if (!user) {
        logger.warn("Tentativa de recuperação de senha para email inexistente", { email });
        return ApiResponse.success(res, null, "Se o email estiver cadastrado, você receberá instruções de recuperação");
    }

    // TODO: Implementar envio de email com token de recuperação
    // Por enquanto, apenas loga a ação
    logger.info("Solicitação de recuperação de senha", { userId: user.id, email });

    return ApiResponse.success(res, null, "Se o email estiver cadastrado, você receberá instruções de recuperação");
});
