import Id from "../share/Id"

export default class Project {
id: string;
name:string;
clientId: string;
ownerId: string;
description?:string | undefined;

constructor(name:string,clientId: string,ownerId: string, description?:string){
  this.id = Id.newId()
  this.name = name
  this.clientId = clientId
  this.ownerId = ownerId
  this.description = description
}
}