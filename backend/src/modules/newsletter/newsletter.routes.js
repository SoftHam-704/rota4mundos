import { Router } from "express";
import { subscribe, unsubscribe, listSubscribers, getStats } from "./newsletter.controller.js";
import { authMiddleware, authorizeRoles } from "../../middlewares/authMiddleware.js";

const router = Router();

router.post("/subscribe", subscribe);
router.get("/unsubscribe/:token", unsubscribe);
router.get("/subscribers", authMiddleware, authorizeRoles("ADMIN", "EDITOR"), listSubscribers);
router.get("/stats", authMiddleware, authorizeRoles("ADMIN", "EDITOR"), getStats);

export default router;
