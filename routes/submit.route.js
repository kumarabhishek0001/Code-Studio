import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { submissionController } from "../controllers/submission.controller.js";

const router = Router();

router.post("/submission/:submissionId", authMiddleware, submissionController);

export default router;
