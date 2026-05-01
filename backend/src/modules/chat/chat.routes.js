import { Router } from "express";
import rateLimit from "express-rate-limit";
import { sendMessage } from "./chat.controller.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const chatLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => ApiResponse.error(res, "Limite de mensagens atingido. Aguarde 15 minutos.", 429),
});

const router = Router();
router.post("/message", chatLimiter, sendMessage);

export default router;
