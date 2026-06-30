// PRISMA CLINET IMPORT
import {prisma} from "../db/prisma.js";

const createUserController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const response = await prisma.Users.create({
      data: {
        username,
        email,
        password,
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
}

export {createUserController}