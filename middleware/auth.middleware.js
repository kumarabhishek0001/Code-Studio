import chalk from "chalk";
import jwt from "jsonwebtoken";
import { convertToObject } from "typescript";

// header: authorization
// header value: Bearer <token>
const authMiddleware = async (req, res, next) => {
  try {
    // console.log(chalk.red(JSON.stringify(req.headers)))
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({
        error: "UNAUTHORIZED",
        message: "Token not provided",
      });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        error: "UNAUTHORIZED",
        message: "malformed token",
      });
    }

    const token = parts[1];
    // console.log("token:", chalk.blue(token))

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      // console.log("I am here")
      if (err) {
        return res.status(401).json({
          error: "UNAUTHORIZED",
          message: "malformed token",
        });
      } else {
        // console.log("decoded:", chalk.red(JSON.stringify(decode)));
        req.id = decode.id;
        next();
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: "INTERNAL SERVER ERROR/middleware error:",
      message: "please try after some time",
      err: error.message
    });
  }
};

export default authMiddleware;
