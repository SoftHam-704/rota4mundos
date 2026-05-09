import { Router } from "express";
import { trackPageView, getPageViewStats } from "./pageview.controller.js";
import { authMiddleware, authorizeRoles } from "../../middlewares/authMiddleware.js";

const router = Router();

router.post("/",      trackPageView);
router.get("/stats",  authMiddleware, authorizeRoles("ADMIN", "EDITOR"), getPageViewStats);

export default router;
