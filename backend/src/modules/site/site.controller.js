import { prisma } from "../../config/database.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const getSiteLikes = asyncHandler(async (req, res) => {
    const fingerprint = req.headers["x-fingerprint"];

    const [count, liked] = await Promise.all([
        prisma.siteLike.count(),
        fingerprint
            ? prisma.siteLike.findUnique({ where: { fingerprint } })
            : Promise.resolve(null),
    ]);

    return ApiResponse.success(res, { count: count + 29, liked: !!liked });
});

export const toggleSiteLike = asyncHandler(async (req, res) => {
    const fingerprint = req.headers["x-fingerprint"];
    if (!fingerprint || fingerprint.length < 8) return ApiResponse.error(res, "Fingerprint inválida", 400);

    const existing = await prisma.siteLike.findUnique({ where: { fingerprint } });

    if (!existing) {
        await prisma.siteLike.create({ data: { fingerprint } });
    }

    const count = await prisma.siteLike.count();
    return ApiResponse.success(res, { liked: true, count });
});
