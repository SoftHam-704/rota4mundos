import { prisma } from "../../config/database.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const listSocialPosts = asyncHandler(async (req, res) => {
    const { status, platform } = req.query;
    const where = {};
    if (status) where.status = status;
    if (platform) where.platform = platform;

    const posts = await prisma.socialPost.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: { article: { select: { id: true, title: true, slug: true } } },
    });

    return ApiResponse.success(res, posts);
});

export const createSocialPost = asyncHandler(async (req, res) => {
    const { articleId, platform, caption, imageUrl, scheduledFor } = req.body;

    const post = await prisma.socialPost.create({
        data: {
            articleId: articleId || null,
            platform,
            caption,
            imageUrl,
            scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        },
        include: { article: { select: { id: true, title: true, slug: true } } },
    });

    return ApiResponse.success(res, post, "Post criado com sucesso", 201);
});

export const updateSocialPost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { caption, status, imageUrl, scheduledFor } = req.body;

    const existing = await prisma.socialPost.findUnique({ where: { id } });
    if (!existing) return ApiResponse.error(res, "Post não encontrado", 404);

    const post = await prisma.socialPost.update({
        where: { id },
        data: {
            ...(caption !== undefined && { caption }),
            ...(status !== undefined && { status }),
            ...(imageUrl !== undefined && { imageUrl }),
            ...(scheduledFor !== undefined && { scheduledFor: scheduledFor ? new Date(scheduledFor) : null }),
            ...(status === "PUBLISHED" && !existing.publishedAt && { publishedAt: new Date() }),
        },
        include: { article: { select: { id: true, title: true, slug: true } } },
    });

    return ApiResponse.success(res, post, "Post atualizado com sucesso");
});

export const deleteSocialPost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const existing = await prisma.socialPost.findUnique({ where: { id } });
    if (!existing) return ApiResponse.error(res, "Post não encontrado", 404);

    await prisma.socialPost.delete({ where: { id } });
    return ApiResponse.success(res, null, "Post removido com sucesso");
});
