import { Router } from "express";
import { createArticle, listArticles, getArticleBySlug, updateArticle, deleteArticle, toggleLike, getLikes } from "./article.controller.js";
import { authMiddleware, authorizeRoles } from "../../middlewares/authMiddleware.js";

const router = Router();

router.get("/", listArticles);
router.get("/:id/likes", getLikes);
router.post("/:id/like", toggleLike);
router.get("/:slug", getArticleBySlug);
router.post("/", authMiddleware, authorizeRoles("ADMIN", "EDITOR"), createArticle);
router.put("/:id", authMiddleware, authorizeRoles("ADMIN", "EDITOR"), updateArticle);
router.delete("/:id", authMiddleware, authorizeRoles("ADMIN"), deleteArticle);

export default router;
