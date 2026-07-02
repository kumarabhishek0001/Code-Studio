import { convertToObject } from "typescript";
import { prisma } from "../db/prisma.js";
import chalk from "chalk";

const createQuestion = async (req, res) => {
  try {
    const { title, description, difficulty } = req.body;
    const userId = req.id

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
        created_by: userId
      },
    });

    return res.status(201).json({
      message: "question created",
      question: response,
    });
  } catch (error) {
    console.log("create-problem-controller issue", error);

    if(error.code === "P2002"){
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


// TODO: RIGHT NOW ANYONE CAN DELETE ANY QUESTION MAKE SURE ONLY THE CREATOR OF THE QUESTION HAS THAT RIGHT
const deleteQuestion = async (req, res) => {
  try {
    const questionId = Number(req.params.questionId);
    const req_by_userId = req.id
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

    if(question.created_by != req_by_userId){
      return res.status(401).json({
        message:"only the creator of question can delete it"
      })
    }

    const deletedQuestion = await prisma.problems.delete({
      where: {
        id: questionId
      }
    })

    return res.status(200).json({
      message: "Question deleted successfully",
      deletedQuestion
    })
  } catch (error) {}
};

export {
  createQuestion,
  getAllQuestionController,
  getQuestionByID,
  deleteQuestion,
};
