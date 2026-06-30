import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import chalk from "chalk";

// PRISMA CLINET IMPORT
import { prisma } from "../db/prisma.js";
import { error } from "node:console";

const createUserController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        error: "BAD REQUEST",
        message: "all fields are required",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const response = await prisma.Users.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: "user created successfully",
      user: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const loginUserController = async (req, res) => {
  // todo: here i am searching using email first then checking password, instead make this a index and check performance
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "BAD REQUEST",
      message: "all fields are mandatory",
    });
  }

  const response = await prisma.Users.findUnique({
    where: {
      email: email,
    },
  });

  if (!response) {
    return res.status(401).json({
      error: "UNAUTHORIZED",
      message: "Invalid credentials",
    });
  }

  // console.log(chalk.blue(JSON.stringify(response)))
  const hashedPassword = response.password;
  const checkPassword = await bcrypt.compare( password, hashedPassword );

  if (!checkPassword) {
    return res.status(401).json({
      error: "UNAUTHORIZED",
      message: "Invalid credentials/password",
    });
  }

  const token = jwt.sign(
    {
      id: response.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  return res.status(200).json({
    token
  });
};

export { createUserController, loginUserController };
