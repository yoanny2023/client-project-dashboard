import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import ClientService from "../services/ClientService";

export default class ClientController{

  static async getClientById(req:AuthRequest, res:Response){

      const clientId = req.params.clientId as string;
      const userId = req.user!.id
      const role = req.user!.role

      const client = await ClientService.getById(clientId,userId,role);

      return res.status(200).json({
        message: "Client found successfully",
        client
      })
  }

  static async create(req:AuthRequest,res:Response){

    const{name,email} = req.body
    const userId = req.user!.id
    const role = req.user!.role

    const client = await ClientService.createClient(name,email,userId,role)
    return res.status(201).json({
      message: "Client created successfully",
      client
    });  
  }

  static async list(req:AuthRequest,res:Response){
    
    const userId = req.user!.id
    const role = req.user!.role
    const clients = await ClientService.listByUser(userId,role);
    
    return res.status(200).json({
      message:"Clients found",
      clients
    }) 
  }

  static async update(req:AuthRequest,res: Response){
    
    const userId = req.user!.id;
    const role = req.user!.role
    const clientId = req.params.clientId as string;
    const data = req.body

    const updatedClient = await ClientService.updateClient(clientId,data,userId,role)
    
    return res.status(200).json({
      message: "Client updated successfully",
      client: updatedClient
    })   
  }

  static async deleteClient(req: AuthRequest, res: Response){

    const userId = req.user!.id
    const role = req.user!.role
    const clientId = req.params.clientId as string;
      
    const deletedClient = await ClientService.deleteClient(clientId,userId,role);

    return res.status(200).json({
      message: "Client was deleted",
      client: deletedClient
    })
  }
}
