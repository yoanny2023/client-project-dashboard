import Id from "../share/Id";

export type Role = "USER" | "ADMIN";

export default class User {
  public id: string;
  public name: string;
  public email: string;
  public password: string;
  public role: Role
  
  constructor(name: string, email: string, password: string, role: Role = "USER"){
    this.id = Id.newId()
    this.name = name;
    this.email = email;
    this.password = password
    this.role = role
  }
}