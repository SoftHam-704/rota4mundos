import { Router } from "express";
import { createArticle, listArticles, getArticleBySlug, updateArticle, deleteArticle } from "./article.controller.js";
import { authMiddleware, authorizeRoles } from "../../middlewares/authMiddleware.js";

const router = Router();

router.get("/", listArticles);
router.get("/:slug", getArticleBySlug);
router.post("/", authMiddleware, authorizeRoles("ADMIN", "EDITOR"), createArticle);
router.put("/:id", authMiddleware, authorizeRoles("ADMIN", "EDITOR"), updateArticle);
router.delete("/:id", authMiddleware, authorizeRoles("ADMIN"), deleteArticle);

export default router;
