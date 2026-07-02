import {
  createQuestion,
  getAllQuestionController,
  getQuestionByID,
  deleteQuestion,
  updateQuestion,
} from "../controllers/question.controller.js";
import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/create-question", authMiddleware, createQuestion);
router.get("/get-all-questions", authMiddleware, getAllQuestionController);
router.get("/get-question/:questionId", authMiddleware, getQuestionByID);
router.delete("/deleteQuestion/:questionId", authMiddleware, deleteQuestion);
router.patch("/updateQuestion/:questionId", authMiddleware, updateQuestion);

export default router;
