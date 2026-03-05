import { Request, Response } from "express";
import AuthService from "../services/AuthService";

export default class AuthController {

  static async login(req: Request,res: Response){
    
      const {email,password} = req.body
      const {user, token} = await AuthService.login(email,password);

      res.cookie("token", token, {
       httpOnly: true,
       secure: true,    
       sameSite: "none",
       path:"/"
      });
     
      return res.status(200).json({
        message:"Login Successful",
        user,
      })
  }  

  static async register(req: Request, res: Response){
 
      const {name,email,password} = req.body
      const user = await AuthService.register(name,email,password)

      return res.status(201).json({
        message:"User registered successfully",
        user:{
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      })
  }
}