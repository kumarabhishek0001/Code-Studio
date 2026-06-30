import { Router } from "express";
import testRouteController from "../controllers/test.controller.js";


const router = Router();

router.get("/initTest", testRouteController)

export default router