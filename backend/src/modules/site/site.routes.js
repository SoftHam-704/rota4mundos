import { Router } from "express";
import { getSiteLikes, toggleSiteLike } from "./site.controller.js";

const router = Router();

router.get("/likes", getSiteLikes);
router.post("/like", toggleSiteLike);

export default router;
