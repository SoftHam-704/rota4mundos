import { prisma } from "../../config/database.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { logger } from "../../config/logger.js";

// POST /api/sponsors/interesse  — público
export const createInterest = asyncHandler(async (req, res) => {
    const { name, email, organization, type, message } = req.body;
    const ipAddress = req.ip || req.headers["x-forwarded-for"];

    const interest = await prisma.sponsorInterest.create({
        data: { name, email, organization, type, message, ipAddress },
    });

    logger.info("Novo interesse de patrocínio registrado", {
        id: interest.id,
        type: interest.type,
        email: interest.email,
    });

    return ApiResponse.success(
        res,
        { id: interest.id },
        "Interesse registrado com sucesso! Entraremos em contato em breve.",
        201
    );
});

// GET /api/sponsors  — admin
export const listInterests = asyncHandler(async (req, res) => {
    const { page = 1, limit = 20, type, status } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where = {};
    if (type)   where.type   = type;
    if (status) where.status = status;

    const [interests, totalItems] = await Promise.all([
        prisma.sponsorInterest.findMany({
            where,
            skip,
            take: Number(limit),
            orderBy: { createdAt: "desc" },
        }),
        prisma.sponsorInterest.count({ where }),
    ]);

    return ApiResponse.paginated(res, interests, {
        page: Number(page),
        limit: Number(limit),
        totalItems,
    });
});

// GET /api/sponsors/stats  — admin
export const getStats = asyncHandler(async (req, res) => {
    const [total, byType, byStatus] = await Promise.all([
        prisma.sponsorInterest.count(),
        prisma.sponsorInterest.groupBy({ by: ["type"],   _count: true }),
        prisma.sponsorInterest.groupBy({ by: ["status"], _count: true }),
    ]);

    return ApiResponse.success(res, { total, byType, byStatus });
});

// PATCH /api/sponsors/:id/status  — admin
export const updateStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const interest = await prisma.sponsorInterest.update({
        where: { id },
        data: { status },
    });

    return ApiResponse.success(res, interest, "Status atualizado");
});
