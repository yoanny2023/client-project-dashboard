import {Response } from "express";
import ProjectService from "../services/ProjectService";
import { AuthRequest } from "../middleware/auth.middleware";

export default class ProjectController{

  static async create(req: AuthRequest, res: Response){
      const{name,description} = req.body
      const ownerId = req.user!.id
      const role = req.user!.role
      const clientId  = req.params.clientId as string;

      const project = await ProjectService.createProject(name,clientId,ownerId,role,description)

      return res.status(201).json({
        message: "Project created successfully",
        project
      })
  }

  static async getById(req: AuthRequest, res: Response){

     const clientId = req.params.clientId as string;
     const id = req.params.id as string;
     const ownerId = req.user!.id
     const role = req.user!.role

     const project = await ProjectService.getById(id,clientId,ownerId,role);

     return res.status(200).json({project})
  }

  static async listByClient(req: AuthRequest, res: Response){

    const clientId = req.params.clientId as string;
    const ownerId = req.user!.id
    const role = req.user!.role

    const projects =  await ProjectService.listByClient(clientId, ownerId,role);

    return res.status(200).json({projects});
  }

  static async update(req:AuthRequest, res: Response){

    const id = req.params.id as string;
    const clientId = req.params.clientId as string;
    const ownerId = req.user!.id;
    const role = req.user!.role
    const {name,description} = req.body;

    const project = await ProjectService.update(id,{name,description},clientId,ownerId,role);

    return res.status(200).json({
      message: "Project updated successfully",
      project
    })
  }

  static async delete(req:AuthRequest, res: Response){

    const id = req.params.id as string
    const clientId = req.params.clientId as string
    const ownerId = req.user!.id
    const role = req.user!.role

    const project = await ProjectService.delete(id,clientId,ownerId,role);

    return res.status(200).json({
      message: "Project deleted",
      project
    })
  }
}
