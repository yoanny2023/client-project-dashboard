import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import UserController from "../controllers/UserController";

const router = Router();

router.get("/me",authMiddleware,UserController.me)

export default router;