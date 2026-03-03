import { ConflictError } from "../errors/ConflictError";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import Project from "../models/Project";
import ClientRepository from "../repositories/ClientRepository";
import ProjectRepository from "../repositories/ProjectRepository";

type Role = "USER" | "ADMIN";

export default class ProjectService{

  static async createProject(
    name:string,
    clientId:string, 
    ownerId: string,
    role: Role,
    description?:string,
  ): Promise<Project> {

    const client = ClientRepository.findById(clientId)

    if(!client) throw new NotFoundError("Client not found");

    if (role !== "ADMIN" && client.ownerId !== ownerId) throw new ForbiddenError();

    const existing = ProjectRepository.findByNameAndClient(name,clientId);

    if(existing) throw new ConflictError("Client's project already exists")
    
    const project = new Project(name,clientId, ownerId, description)
    ProjectRepository.save(project)
    return project
  }

  static async getById(ProjectId:string,clientId:string,ownerId:string,role: Role):Promise<Project>{
    
    const client = ClientRepository.findById(clientId);
    if (!client) throw new NotFoundError("Client not found");

    if (role !== "ADMIN" && client.ownerId !== ownerId) throw new ForbiddenError();
    
    const project = ProjectRepository.findById(ProjectId);

    if(!project || project.clientId !== clientId) throw new NotFoundError("Project not found")
    
    return project
  }

  static async listByClient(clientId: string, ownerId: string,role: Role): Promise<Project[]>{

    const client = ClientRepository.findById(clientId);
    if (!client) throw new NotFoundError("Client not found");

    if (role !== "ADMIN" && client.ownerId !== ownerId) throw new ForbiddenError();
    
    return ProjectRepository.findByClientId(clientId);
  }

  static async update(
    ProjectId: string,
    data: Partial<Pick<Project,"name" | "description">>,
    clientId: string,
    ownerId: string,
    role: Role 
  ):Promise<Project>{

    const client = ClientRepository.findById(clientId);
    if (!client) throw new NotFoundError("Client not found");

    if (role !== "ADMIN" && client.ownerId !== ownerId) throw new ForbiddenError();

    const project = ProjectRepository.findById(ProjectId);

    if (!project || project.clientId !== clientId) {
      throw new NotFoundError("Project not found");
  }

  const cleanData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined)
  );
    
    const updated = ProjectRepository.updateById(ProjectId,cleanData)

    if(!updated) throw new NotFoundError("Project not found")
    
    return updated;
  }

  static async delete(projectId:string,clientId:string,ownerId: string, role: Role):Promise<Project>{

    const client = ClientRepository.findById(clientId);
    if (!client) throw new NotFoundError("Client not found");

    if (role !== "ADMIN" && client.ownerId !== ownerId) throw new ForbiddenError();

    const project = ProjectRepository.findById(projectId);

    if (!project || project.clientId !== clientId) {
    throw new NotFoundError("Project not found");
   }
    const deleted = ProjectRepository.deleteById(projectId);

    if (!deleted) throw new NotFoundError("Project not found");
    
    return deleted
  }
}