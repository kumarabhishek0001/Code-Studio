import { convertToObject } from "typescript";
import { prisma } from "../db/prisma.js";
import chalk from "chalk";

const createQuestion = async (req, res) => {
  try {
    const { title, description, difficulty } = req.body;
    const userId = req.id;

    if (!title || !description || !difficulty) {
      return res.status(400).json({
        message: "All feilds are required",
      });
    }

    const response = await prisma.problems.create({
      data: {
        title: title,
        description: description,
        difficulty: difficulty,
        created_by: userId,
      },
    });

    return res.status(201).json({
      message: "question created",
      question: response,
    });
  } catch (error) {
    console.log("create-problem-controller issue", error);

    if (error.code === "P2002") {
      return res.status(400).json({
        message: "This title is already taken",
      });
    }
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

const getAllQuestionController = async (req, res) => {
  try {
    const response = await prisma.Problems.findMany();
    res.status(200).json({
      message: "fetched all questions",
      questions: response,
    });
  } catch (error) {
    console.log("problem getallquestioncontroller");
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getQuestionByID = async (req, res) => {
  try {
    const questionId = Number(req.params.questionId);
    // console.log(chalk.red(questionId));

    const question = await prisma.problems.findUnique({
      where: {
        id: questionId,
      },
    });

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }
    // console.log(chalk.red("question"));
    // console.log(question);

    const { id: questionNumber, title, description, difficulty } = question;

    return res.status(200).json({
      message: "Question found",
      question: {
        questionNumber,
        title,
        description,
        difficulty,
      },
    });
  } catch (err) {
    console.log("getQuestionByID controller error:", err);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

// // TODO: RIGHT NOW ANYONE CAN DELETE ANY QUESTION MAKE SURE ONLY THE CREATOR OF THE QUESTION HAS THAT RIGHT
const deleteQuestion = async (req, res) => {
  try {
    const questionId = Number(req.params.questionId);
    const req_by_userId = req.id;
    // console.log(chalk.red(questionId));

    const question = await prisma.problems.findUnique({
      where: {
        id: questionId,
      },
    });

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    if (question.created_by != req_by_userId) {
      return res.status(401).json({
        message: "only the creator of question can delete it",
      });
    }

    const deletedQuestion = await prisma.problems.delete({
      where: {
        id: questionId,
      },
    });

    return res.status(200).json({
      message: "Question deleted successfully",
      deletedQuestion,
    });
  } catch (error) {}
};

const updateQuestion = async (req, res) => {
  try {
    const questionId = Number(req.params.questionId);
    const req_by_userId = req.id;

    if (isNaN(questionId)) {
      return res.status(400).json({
        message: "Invalid question id",
      });
    }

    const {
      newTitle = null,
      newDescription = null,
      newDifficulty = null,
    } = req.body;

    // console.log(req.body);

    // console.log("title:", newTitle);
    // console.log("description:", newDescription);
    // console.log("difficulty:", newDifficulty);

    const question = await prisma.problems.findUnique({
      where: {
        id: questionId,
      },
    });

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    if (question.created_by != req_by_userId) {
      return res.status(401).json({
        message: "only creator of question can update their question",
      });
    }

    const updated = await prisma.problems.update({
      where: {
        id: questionId,
      },
      data: {
        title: newTitle ? newTitle : question.title,
        description: newDescription ? newDescription : question.description,
        difficulty: newDifficulty ? newDifficulty : question.difficulty,
      },
    });

    return res.status(200).json({
      message: "question update successfully",
      updatedQuestion: updated,
    });
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(400).json({
        message: "Title is already present",
      });
    }

    console.log("error at question-update-controller: ", err);
    return res.status(500).json({
      message: "internal server",
    });
  }
};

export {
  createQuestion,
  getAllQuestionController,
  getQuestionByID,
  deleteQuestion,
  updateQuestion,
};
