import User from "../models/User";
import UserRepository from "../repositories/UserRepositories";

export default class UserService {

  static async getMe(userId:string): Promise<Omit<User, "password"> | undefined>{
    const user = UserRepository.findById(userId)
    if(!user) throw new Error("User not found")
    
    const{password,...safeUser} = user
    return  safeUser
  }
}