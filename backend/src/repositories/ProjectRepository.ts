import { db } from "../data/db";
import Project from "../models/Project";

export default class ProjectRepository{

 static findById(id: string): Project | undefined {
  return db.projects.find(project => project.id === id);
}

 static findByClientId(clientId: string): Project[]{
   return db.projects.filter((project) => project.clientId === clientId)
 }

 static findByNameAndClient(name: string,clientId: string): Project | undefined {
  return db.projects.find(p => p.name === name && p.clientId === clientId);
}

 static save(project: Project){
  db.projects.push(project)
 }

  static updateById(
    id: string,
    data: Partial<Pick<Project, "name" | "description">>
  ): Project | undefined {

    const project = this.findById(id);
    if (!project) return undefined;

    Object.assign(project, data);
    return project;
  }

   static deleteById(id: string): Project | undefined {
    const index = db.projects.findIndex(project => project.id === id);
    if (index === -1) return undefined;

    const [deleted] = db.projects.splice(index, 1);
    return deleted;
  }
}
