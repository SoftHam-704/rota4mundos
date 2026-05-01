import { prisma } from "../../config/database.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const createComment = asyncHandler(async (req, res) => {
    const { articleId, content, authorName, authorEmail } = req.body;

    const comment = await prisma.comment.create({
        data: {
            articleId,
            content,
            userId: req.user?.id || null,
            authorName: req.user?.name || authorName,
            authorEmail: req.user?.email || authorEmail,
            status: req.user ? "APPROVED" : "PENDING",
        },
        include: { user: { select: { name: true, avatarUrl: true } } },
    });

    return ApiResponse.success(res, comment, "Comentário enviado para moderação", 201);
});

export const listComments = asyncHandler(async (req, res) => {
    const { articleId, status = "PENDING", page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (articleId) where.articleId = articleId;
    if (status) where.status = status;

    const [comments, totalItems] = await Promise.all([
        prisma.comment.findMany({
            where, skip, take: +limit,
            orderBy: { createdAt: "desc" },
            include: { article: { select: { title: true, slug: true } }, user: { select: { name: true } } },
        }),
        prisma.comment.count({ where }),
    ]);

    return ApiResponse.paginated(res, comments, { page: +page, limit: +limit, totalItems });
});

export const moderateComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const comment = await prisma.comment.update({
        where: { id },
        data: { status },
    });

    return ApiResponse.success(res, comment, `Comentário ${status.toLowerCase()}`);
});

export const deleteComment = asyncHandler(async (req, res) => {
    await prisma.comment.delete({ where: { id: req.params.id } });
    return ApiResponse.success(res, null, "Comentário removido");
});
