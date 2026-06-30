import {createUserController, loginUserController} from "../controllers/auth.controller.js"

import { Router } from "express"

const router = Router()

router.post("/create", createUserController)
router.post("/login",loginUserController)

export default router