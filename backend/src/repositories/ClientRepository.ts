import { db } from "../data/db";
import Client from "../models/Client";

export default class ClientRepository{

  static findAll(): Client[] {
    return db.clients
   }
  
  static findById(id: string): Client | undefined {
  return db.clients.find(c => c.id === id);
}

  static findByEmail(email: string): Client | undefined {
  return db.clients.find(c => c.email === email);
}

  static findByUserId(userId:string):Client[]{
    return db.clients.filter((client) => client.ownerId === userId)
  }
  
  static save(client:Client){
    db.clients.push(client)
  }

  static updateById(
    id:string,
    data: Partial<Pick<Client, "name" | "email">>
  ): Client | undefined {

    const client = this.findById(id);

    if(!client) return undefined;

    Object.assign(client,data);

    return client;
}
   static deleteById(id:string): Client | undefined{
    const index = db.clients.findIndex( client => client.id === id)
    if(index === -1) return undefined;

    const [deletedClient] = db.clients.splice(index, 1)
    return deletedClient
   }
}