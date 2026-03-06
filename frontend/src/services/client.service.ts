import { CreateClientResponse } from "@/types/Client/CreateClientResponse";
import { DeleteClientResponse } from "@/types/Client/DeleteClientResponse";
import { UpdateClientResponse } from "@/types/Client/UpdateClientResponse";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://client-project-dashboard.onrender.com";

export async function getClients() {
  const res = await fetch(`${API_URL}/clients`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch clients");

  return await res.json();
}

export async function getClientById(id: string) {
  const res = await fetch(`${API_URL}/clients/${id}`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch client");

  return await res.json();
}

export async function createClient(data: {
  name: string;
  email: string;
}): Promise<CreateClientResponse> {
  const res = await fetch(`${API_URL}/clients`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
   
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);

  return result;
}

export async function updateClient(
  id: string,
  data: { name: string; email: string }
):Promise<UpdateClientResponse> {
  const res = await fetch(`${API_URL}/clients/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update client");

  return await res.json();
}

export async function deleteClient(id: string):Promise<DeleteClientResponse> {
  const res = await fetch(`${API_URL}/clients/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  
  const result = await res.json(); 
  if (!res.ok) throw new Error("Failed to delete client");

  return result
}