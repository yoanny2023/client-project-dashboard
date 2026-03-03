import { Project } from "@/types/project";
import { CreateProjectResponse } from "@/types/project/CreateProjectResponse";
import { DeleteProjectResponse } from "@/types/project/DeleteProjectResponse";
import { UpdateProjectResponse } from "@/types/project/UpdateProjectResponse";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProjectsByClient(clientId:string):Promise<Project[]>{

  const res = await fetch(`${API_URL}/clients/${clientId}/projects`,{
    credentials: "include",
  });

  if(!res.ok) throw new Error("Failed to fetch projects");

  const data = await res.json();
  return data.projects;
}

export async function getProjectById(clientId:string,projectId:string):Promise<Project>{

  const res = await fetch(`${API_URL}/clients/${clientId}/projects/${projectId}`,{
    credentials: "include",
  });

  if(!res.ok) throw new Error("Failed to fetch project");

  const data = await res.json();
  return data.project;
}

export async function createProject(
  clientId:string,data:Omit<Project,"id" | "clientId" | "ownerId">
):Promise<CreateProjectResponse>{

  const res = await fetch(`${API_URL}/clients/${clientId}/projects`,{
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if(!res.ok) throw new Error(result.message || "Something went wrong");
  return result;
}

export async function updateProject(
  clientId: string,
  projectId: string,
  data: { name: string; description?: string }
): Promise<UpdateProjectResponse> {
  const res = await fetch(`${API_URL}/clients/${clientId}/projects/${projectId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
}

export async function deleteProject(clientId: string,projectId: string):Promise<DeleteProjectResponse> {
  const res = await fetch(`${API_URL}/clients/${clientId}/projects/${projectId}`,{
      method: "DELETE",
      credentials: "include",
    }
  );
  const result = await res.json() 
  if (!res.ok) throw new Error(result.message);
  return result
}