import { Request,Response,NextFunction } from "express";
import JWT from "../utils/jwt";
import AppError from "../errors/AppError";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export interface AuthRequest extends Request{
  user?: {
    id:string,
    role: "USER" | "ADMIN";
  }
}

export default function authMiddleware(req: AuthRequest,res: Response,next: NextFunction){
 
  const token = req.cookies.token as string

  if (!token) throw new UnauthorizedError()

  try {
    const decoded = JWT.verify(token) as {
      id: string,
      email: string,
      role: "ADMIN" | "USER"
    }

    req.user = decoded;
    next();

  } catch (error) {
     throw new AppError("Invalid token", 401);
  }
}