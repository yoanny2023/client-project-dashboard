"use server";

import { cookies } from "next/headers";
import { CreateClientResponse } from "@/types/Client/CreateClientResponse";
import { DeleteClientResponse } from "@/types/Client/DeleteClientResponse";
import { UpdateClientResponse } from "@/types/Client/UpdateClientResponse";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://client-project-dashboard.onrender.com";

async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}

export async function getClients() {

  const token = await getToken();

  const res = await fetch(`${API_URL}/clients`, {
    headers: {
    Cookie: `token=${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch clients");

  return await res.json();
}

export async function getClientById(id: string) {

  const token = await getToken();

  const res = await fetch(`${API_URL}/clients/${id}`, {
      headers: {
      Cookie: `token=${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch client");

  return await res.json();
}

export async function createClient(data: {
  name: string;
  email: string;
}): Promise<CreateClientResponse> {

   const token = await getToken();

  const res = await fetch(`${API_URL}/clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token}`,
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

  const token = await getToken();
  
  const res = await fetch(`${API_URL}/clients/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
       Cookie: `token=${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update client");

  return await res.json();
}

export async function deleteClient(id: string):Promise<DeleteClientResponse> {

  const token = await getToken();

  const res = await fetch(`${API_URL}/clients/${id}`, {
    method: "DELETE",
     headers: {
      Cookie: `token=${token}`,
    },
  });
  
  const result = await res.json(); 
  if (!res.ok) throw new Error("Failed to delete client");

  return result
}