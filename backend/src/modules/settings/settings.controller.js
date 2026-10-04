import { prisma } from "../../config/database.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

// Esta rota é PÚBLICA (sem login). site_settings também guarda segredos e estado interno
// (ig_token, fb_page_token, links vistos pelo Repórter…), então só sai o que está nesta lista.
// Até 04/10/2026 ela devolvia a tabela inteira — o token do Instagram ficou exposto.
const CHAVES_PUBLICAS = ["siteTitle", "siteDescription", "contactEmail", "analyticsId", "maintenanceMode"];

export const getSettings = asyncHandler(async (req, res) => {
    const settings = await prisma.siteSetting.findMany({ where: { key: { in: CHAVES_PUBLICAS } } });
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
    const [
        users, articles, subscribers,
        siteLikes,
        pendingContributions,
        pendingSocialPosts,
    ] = await Promise.all([
        prisma.user.count(),
        prisma.article.count(),
        prisma.newsletterSubscriber.count({ where: { active: true } }),
        prisma.siteLike.count(),
        prisma.contribution.count({ where: { status: "PENDENTE" } }),
        prisma.socialPost.count({ where: { status: "DRAFT" } }),
    ]);

    const recentArticles = await prisma.article.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: { id: true, title: true, status: true, createdAt: true },
    });

    return ApiResponse.success(res, {
        users, articles, subscribers,
        siteLikes,
        pendingContributions,
        pendingSocialPosts,
        recentArticles,
    });
});
