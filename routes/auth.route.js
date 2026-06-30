import {createUserController} from "../controllers/auth.controller.js"

import { Router } from "express"

const router = Router()

router.post("/create", createUserController)

export default router