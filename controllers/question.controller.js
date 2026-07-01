import { convertToObject } from "typescript";
import { prisma } from "../db/prisma.js";

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
  } catch(error) {
    console.log("create-problem-controller issue", error)
    return res.status(500).json({
        message: "internal server error"
    })
  }
};

const getAllQuestionController = async (req, res) => {
  try {
    const response = await prisma.Problems.findMany()
    res.status(200).json({
      message: "fetched all questions",
      questions: response
    })
  } catch (error) {
    console.log("problem getallquestioncontroller")
    res.status(500).json({
      message: "Internal server error"
    })
  }
}

export { createQuestion, getAllQuestionController };
