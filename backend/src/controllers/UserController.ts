import { AuthRequest } from "../middleware/auth.middleware";
import { Response } from "express";
import UserService from "../services/UserService";

export default class UserController{
 static async me(req: AuthRequest,res: Response){
  const userId = req.user!.id;
  const user = await UserService.getMe(userId)

  return res.status(200).json({
    message:"Authorized user",
    user
  });
 }
}