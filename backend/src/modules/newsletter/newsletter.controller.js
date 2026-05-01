import { prisma } from "../../config/database.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const subscribe = asyncHandler(async (req, res) => {
    const { email, name, interests, lang = "pt" } = req.body;

    const subscriber = await prisma.newsletterSubscriber.upsert({
        where: { email },
        update: { name, interests, active: true, lang },
        create: { email, name, interests, lang },
    });

    return ApiResponse.success(res, { email: subscriber.email }, "Inscrição realizada com sucesso", 201);
});

export const unsubscribe = asyncHandler(async (req, res) => {
    const { token } = req.params;

    await prisma.newsletterSubscriber.update({
        where: { token },
        data: { active: false },
    });

    return ApiResponse.success(res, null, "Descadastro realizado com sucesso");
});

export const listSubscribers = asyncHandler(async (req, res) => {
    const { page = 1, limit = 20, active } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (active !== undefined) where.active = active === "true";

    const [subscribers, totalItems] = await Promise.all([
        prisma.newsletterSubscriber.findMany({ where, skip, take: +limit, orderBy: { createdAt: "desc" } }),
        prisma.newsletterSubscriber.count({ where }),
    ]);

    return ApiResponse.paginated(res, subscribers, { page: +page, limit: +limit, totalItems });
});

export const getStats = asyncHandler(async (req, res) => {
    const [total, active, inactive] = await Promise.all([
        prisma.newsletterSubscriber.count(),
        prisma.newsletterSubscriber.count({ where: { active: true } }),
        prisma.newsletterSubscriber.count({ where: { active: false } }),
    ]);

    return ApiResponse.success(res, { total, active, inactive });
});
