import { prisma } from "../../config/database.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const BOT_PATTERN = /bot|crawl|spider|slurp|mediapartners|googlebot|bingbot|facebookexternalhit/i;

// POST /api/pageviews  — público, anônimo, sem autenticação
export const trackPageView = asyncHandler(async (req, res) => {
    const ua = req.headers["user-agent"] || "";
    if (BOT_PATTERN.test(ua)) return ApiResponse.success(res, null, "ok");

    const { path, referrer, country } = req.body;
    if (!path) return ApiResponse.success(res, null, "ok");

    const ip = (req.headers["x-forwarded-for"] || req.ip || "").split(",")[0].trim();

    await prisma.pageView.create({
        data: {
            path: String(path).slice(0, 255),
            referrer: referrer ? String(referrer).slice(0, 255) : null,
            country: country ? String(country).slice(0, 5) : null,
            ip: ip || null,
        },
    });

    return ApiResponse.success(res, null, "ok", 201);
});

// GET /api/pageviews/stats?days=30  — admin
export const getPageViewStats = asyncHandler(async (req, res) => {
    const days = Math.min(Number(req.query.days) || 30, 365);
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const [total, periodTotal, topPages, dailyRaw] = await Promise.all([
        prisma.pageView.count(),
        prisma.pageView.count({ where: { createdAt: { gte: since } } }),
        prisma.pageView.groupBy({
            by: ["path"],
            _count: { path: true },
            where: { createdAt: { gte: since } },
            orderBy: { _count: { path: "desc" } },
            take: 10,
        }),
        prisma.$queryRaw`
            SELECT DATE("createdAt") AS date, COUNT(*)::int AS views
            FROM page_views
            WHERE "createdAt" >= ${since}
            GROUP BY DATE("createdAt")
            ORDER BY date ASC
        `,
    ]);

    const topPagesFormatted = topPages.map(p => ({
        path: p.path,
        views: p._count.path,
    }));

    const daily = (dailyRaw || []).map(r => ({
        date: r.date instanceof Date ? r.date.toISOString().slice(0, 10) : String(r.date),
        views: Number(r.views),
    }));

    return ApiResponse.success(res, { total, periodTotal, topPages: topPagesFormatted, daily, days });
});
