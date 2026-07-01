import { createQuestion, getAllQuestionController } from "../controllers/question.controller.js";
import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/create-question", authMiddleware, createQuestion);
router.get("/get-all-questions", authMiddleware, getAllQuestionController)

export default router;
