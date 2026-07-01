import { createQuestion } from "../controllers/question.controller.js";
import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/create-question", authMiddleware, createQuestion);

export default router;
