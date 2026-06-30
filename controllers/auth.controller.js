import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

// PRISMA CLINET IMPORT
import {prisma} from "../db/prisma.js";

const createUserController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if(!username || !email || !password){
      return res.status(400).json({
        error: "BAD REQUEST",
        message: "all fields are required"
      })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)


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
}


const loginUserController = async(req, res) => {

}

export {createUserController, loginUserController}