import { db } from "../data/db";
import User from "../models/User";

export default class UserRepository{

  static findByEmail(email:string): User | undefined { 
    return db.users.find((user) => user.email === email)
  }

  static save(user: User){
    db.users.push(user)
  }

  static findById(id:string):User | undefined {
    return db.users.find((user) => user.id === id)
  }
}