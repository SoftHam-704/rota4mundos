import { Router } from "express";
import { register, login, getMe, forgotPassword } from "./auth.controller.js";
import { validateSchema } from "../../middlewares/validationMiddleware.js";
import { authLimiter } from "../../middlewares/rateLimiter.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { registerSchema, loginSchema, forgotPasswordSchema } from "./auth.schema.js";

const router = Router();

// Rotas públicas com rate limiter para prevenir brute force
router.post("/register", authLimiter, validateSchema(registerSchema), register);
router.post("/login", authLimiter, validateSchema(loginSchema), login);
router.post("/forgot-password", authLimiter, validateSchema(forgotPasswordSchema), forgotPassword);

// Rotas protegidas
router.get("/me", authMiddleware, getMe);

export default router;
