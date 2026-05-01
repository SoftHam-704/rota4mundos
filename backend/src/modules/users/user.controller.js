import { prisma } from "../../config/database.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import bcrypt from "bcryptjs";

export const listUsers = asyncHandler(async (req, res) => {
    const { page = 1, limit = 20, search, role } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (search) where.OR = [{ name: { contains: search, mode: "insensitive" } }, { email: { contains: search, mode: "insensitive" } }];
    if (role) where.role = role;

    const [users, totalItems] = await Promise.all([
        prisma.user.findMany({
            where, skip, take: +limit,
            orderBy: { createdAt: "desc" },
            select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true, lastLoginAt: true },
        }),
        prisma.user.count({ where }),
    ]);

    return ApiResponse.paginated(res, users, { page: +page, limit: +limit, totalItems });
});

export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, role, isActive } = req.body;

    const user = await prisma.user.update({
        where: { id },
        data: { name, role, isActive },
        select: { id: true, name: true, email: true, role: true, isActive: true },
    });

    return ApiResponse.success(res, user, "Usuário atualizado com sucesso");
});

export const updateProfile = asyncHandler(async (req, res) => {
    const { name, password } = req.body;
    const data = { name };

    if (password) {
        data.passwordHash = await bcrypt.hash(password, 12);
    }

    const user = await prisma.user.update({
        where: { id: req.user.id },
        data,
        select: { id: true, name: true, email: true, role: true, avatarUrl: true },
    });

    return ApiResponse.success(res, user, "Perfil atualizado com sucesso");
});
