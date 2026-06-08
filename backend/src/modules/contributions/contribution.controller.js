import { prisma } from "../../config/database.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import logger from "../../config/logger.js";

export const submitContribution = asyncHandler(async (req, res) => {
    const { name, email, city, type, title, content } = req.body;

    if (!name || !email || !city || !type || !title || !content) {
        return ApiResponse.error(res, "Todos os campos obrigatórios devem ser preenchidos", 400);
    }

    const contribution = await prisma.contribution.create({
        data: { name, email, city, type, title, content },
    });

    logger.info("Nova contribuição recebida", { id: contribution.id, city, type });
    return ApiResponse.success(res, { id: contribution.id }, "Contribuição enviada com sucesso!", 201);
});

export const listContributions = asyncHandler(async (req, res) => {
    const { status } = req.query;
    const where = status ? { status } : {};

    const contributions = await prisma.contribution.findMany({
        where,
        orderBy: { createdAt: "desc" },
    });

    return ApiResponse.success(res, contributions);
});

export const myContributions = asyncHandler(async (req, res) => {
    const contributions = await prisma.contribution.findMany({
        where: { email: req.user.email },
        orderBy: { createdAt: "desc" },
        select: { id: true, type: true, title: true, city: true, status: true, notes: true, createdAt: true },
    });
    return ApiResponse.success(res, contributions);
});

export const updateContribution = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status, notes } = req.body;

    const existing = await prisma.contribution.findUnique({ where: { id } });
    if (!existing) return ApiResponse.error(res, "Contribuição não encontrada", 404);

    const contribution = await prisma.contribution.update({
        where: { id },
        data: {
            ...(status && { status }),
            ...(notes !== undefined && { notes }),
        },
    });

    return ApiResponse.success(res, contribution, "Contribuição atualizada");
});
