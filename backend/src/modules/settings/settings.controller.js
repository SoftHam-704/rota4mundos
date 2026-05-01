import { prisma } from "../../config/database.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const getSettings = asyncHandler(async (req, res) => {
    const settings = await prisma.siteSetting.findMany();
    const settingsMap = settings.reduce((acc, s) => {
        acc[s.key] = s.type === "boolean" ? s.value === "true" : s.value;
        return acc;
    }, {});
    return ApiResponse.success(res, settingsMap);
});

export const updateSetting = asyncHandler(async (req, res) => {
    const { key } = req.params;
    const { value } = req.body;

    const setting = await prisma.siteSetting.update({
        where: { key },
        data: { value, updatedAt: new Date() },
    });

    return ApiResponse.success(res, setting, "Configuração atualizada");
});

export const getDashboardStats = asyncHandler(async (req, res) => {
    const [users, articles, cities, comments, subscribers] = await Promise.all([
        prisma.user.count(),
        prisma.article.count(),
        prisma.city.count(),
        prisma.comment.count(),
        prisma.newsletterSubscriber.count({ where: { active: true } }),
    ]);

    const recentArticles = await prisma.article.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: { id: true, title: true, status: true, createdAt: true },
    });

    return ApiResponse.success(res, { users, articles, cities, comments, subscribers, recentArticles });
});
