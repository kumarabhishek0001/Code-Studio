import { convertToObject } from "typescript";
import { prisma } from "../db/prisma.js";
import chalk from "chalk";

const createQuestion = async (req, res) => {
  try {
    const { title, description, difficulty } = req.body;

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
      },
    });

    return res.status(201).json({
      message: "question created",
      question: response,
    });
  } catch (error) {
    console.log("create-problem-controller issue", error);
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


export { createQuestion, getAllQuestionController, getQuestionByID };
