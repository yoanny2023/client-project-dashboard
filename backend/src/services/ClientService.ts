import { ConflictError } from "../errors/ConflictError";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import Client from "../models/Client";
import ClientRepository from "../repositories/ClientRepository";

type Role = "USER" | "ADMIN";

export default class ClientService{

  static async getById(clientId:string, userId:string, role: Role):Promise<Client>{
     const client = ClientRepository.findById(clientId);

     if(!client) throw new NotFoundError("Client not found");

     if(role !== "ADMIN" && client.ownerId !== userId) throw new ForbiddenError()

     return client;
  }

  static async createClient(name: string,email: string,userId: string,role: Role):Promise<Client>{
    
    const existing = ClientRepository.findByEmail(email);

    if(existing) throw new ConflictError("Client with this email already exists");

    const client = new Client(name,email,userId)
    ClientRepository.save(client)
    
    return client 
  }

  static async updateClient(
    id:string,
    data: Partial<Pick<Client, "name" | "email">>,
    userId: string,
    role: Role
  ):Promise<Client>{
    
    const client = ClientRepository.findById(id)
    if(!client) throw new NotFoundError("Client not found");

    if(role !== "ADMIN" && client.ownerId !== userId) throw new ForbiddenError();

    const cleanData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined)
  );

    const updatedClient = ClientRepository.updateById(id, cleanData);

    if (!updatedClient) throw new NotFoundError("Client not found");
    
    return updatedClient;
  }

  static async deleteClient(clientId: string, userId: string, role: Role):Promise<Client>{
    const client = ClientRepository.findById(clientId);
    if (!client) throw new NotFoundError("Client not found");

    if (role !== "ADMIN" && client.ownerId !== userId) throw new ForbiddenError();
    
    const deletedClient = ClientRepository.deleteById(clientId);
    if(!deletedClient) throw new NotFoundError("Client not found")
    
    return deletedClient
  }

  static async listByUser(userId: string, role: Role): Promise<Client[]> {

    if (role === "ADMIN") return ClientRepository.findAll();
    
    return ClientRepository.findByUserId(userId);
  }
}
