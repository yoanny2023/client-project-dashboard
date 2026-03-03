import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { validate } from "../middleware/validate.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

const router = Router();

router.post("/login",validate(loginSchema),AuthController.login)
router.post("/register",validate(registerSchema),AuthController.register)

export default router;