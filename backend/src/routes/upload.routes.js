import { Router } from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { authMiddleware, authorizeRoles } from "../middlewares/authMiddleware.js";
import { uploadLimiter } from "../middlewares/rateLimiter.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../config/database.js";
import fs from "fs";

// Configuração do Multer para upload local (em dev)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = "uploads/";
        if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (allowedMimes.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Tipo de arquivo não suportado. Use JPG, PNG, WEBP ou GIF."), false);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

const router = Router();

/**
 * Upload de imagem única
 * POST /api/upload/image
 */
router.post(
    "/image",
    authMiddleware,
    authorizeRoles("ADMIN", "EDITOR"),
    uploadLimiter,
    upload.single("image"),
    asyncHandler(async (req, res) => {
        if (!req.file) return ApiResponse.error(res, "Nenhuma imagem enviada", 400);

        const fileUrl = `${process.env.APP_BASE_URL}/uploads/${req.file.filename}`;

        const media = await prisma.media.create({
            data: {
                filename: req.file.filename,
                originalName: req.file.originalname,
                mimeType: req.file.mimetype,
                size: req.file.size,
                url: fileUrl,
                folder: "uploads",
            },
        });

        return ApiResponse.success(res, { url: fileUrl, media }, "Upload realizado com sucesso", 201);
    })
);

/**
 * Upload múltiplo de imagens
 * POST /api/upload/images
 */
router.post(
    "/images",
    authMiddleware,
    authorizeRoles("ADMIN", "EDITOR"),
    uploadLimiter,
    upload.array("images", 10),
    asyncHandler(async (req, res) => {
        if (!req.files?.length) return ApiResponse.error(res, "Nenhuma imagem enviada", 400);

        const files = req.files.map((file) => ({
            filename: file.filename,
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            url: `${process.env.APP_BASE_URL}/uploads/${file.filename}`,
            folder: "uploads",
        }));

        const media = await prisma.media.createMany({ data: files });

        return ApiResponse.success(res, { files: files.map((f) => f.url), count: media.count }, "Upload realizado com sucesso", 201);
    })
);

export default router;
