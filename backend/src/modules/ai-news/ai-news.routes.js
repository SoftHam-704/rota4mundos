import { Router } from "express";
import { fetchAiNews } from "./ai-news.controller.js";
import { authMiddleware, authorizeRoles } from "../../middlewares/authMiddleware.js";

const router = Router();

router.post("/fetch", authMiddleware, authorizeRoles("ADMIN", "EDITOR"), fetchAiNews);

export default router;
