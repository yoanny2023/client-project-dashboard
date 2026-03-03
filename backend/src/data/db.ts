import Client from "../models/Client";
import Project from "../models/Project";
import User from "../models/User";
import bcrypt from "bcrypt"

const users: User[] = [];
const clients: Client[] = [];
const projects: Project[] = [];

 (async ()=>{
   users.push(
     new User("Marcos Pedro","marcos2026@example.com",await bcrypt.hash("123456",10),"ADMIN"),
    new User("Pedro Matias","pedro2028@example.com",await bcrypt.hash("654321",10),"USER"),
    new User("Carla Gomes","freeks2030@example.com",await bcrypt.hash("456789",10),"USER")
   )
 })()

export const db = {
  users,
  clients,
  projects,
}