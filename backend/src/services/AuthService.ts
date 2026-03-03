import User from "../models/User";
import UserRepository from "../repositories/UserRepositories";
import bcrypt from "bcrypt"
import JWT from "../utils/jwt";
import { NotFoundError } from "../errors/NotFoundError";
import { ConflictError } from "../errors/ConflictError";

export default class AuthService {

  static async login(email:string,password:string):Promise<{ user: Omit<User, "password">; token: string }>{
    const findUser = UserRepository.findByEmail(email)
    if(!findUser) throw new NotFoundError("Invalid email or password");

    const passwordMatch = await bcrypt.compare(password,findUser.password)
    
    if(!passwordMatch) throw new NotFoundError("Invalid email or password");

      const token = JWT.sign({
        id:findUser.id,
        email: findUser.email,
        role: findUser.role 
      })

      const{password:_,...safeUser} = findUser;

      return {
        user: safeUser,
        token
      }
  }

  static async register(name:string,email:string,password:string):Promise<Omit<User, "password">>{
    const exists =  UserRepository.findByEmail(email)
    if(exists) throw new ConflictError("User already exists")

    const hashedPassword = await bcrypt.hash(password,10)

    const newUser = new User(name,email,hashedPassword) 
    UserRepository.save(newUser)
    const{password:_,...safeUser} = newUser;
    return safeUser
  }
}