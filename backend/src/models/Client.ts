import Id from "../share/Id"

export default class Client{
  id:string
  name:string
  email:string
  ownerId:string  

  constructor(name:string,email:string,userId:string){
   this.id = Id.newId()
   this.name = name
   this.email = email
   this.ownerId = userId
  }
}