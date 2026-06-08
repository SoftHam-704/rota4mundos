import { Router } from "express";
import { submitContribution, listContributions, updateContribution, myContributions } from "./contribution.controller.js";
import { authMiddleware, authorizeRoles } from "../../middlewares/authMiddleware.js";

const router = Router();

router.post("/", submitContribution);
router.get("/minhas", authMiddleware, myContributions);
router.get("/", authMiddleware, authorizeRoles("ADMIN", "EDITOR"), listContributions);
router.put("/:id", authMiddleware, authorizeRoles("ADMIN", "EDITOR"), updateContribution);

export default router;
