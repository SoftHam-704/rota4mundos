import { Router } from "express";
import { getSettings, updateSetting, getDashboardStats } from "./settings.controller.js";
import { authMiddleware, authorizeRoles } from "../../middlewares/authMiddleware.js";

const router = Router();

router.get("/", getSettings);
router.get("/dashboard", authMiddleware, authorizeRoles("ADMIN", "EDITOR"), getDashboardStats);
router.put("/:key", authMiddleware, authorizeRoles("ADMIN"), updateSetting);

export default router;
