"use server";

import { cookies } from "next/headers";
import { User } from "@/types/user";

type LoginState = {
  error?: string
  fieldErrors?: Record<string, string>
  user?: User
};

export default async function loginAction(_prevState:LoginState,formData: FormData):Promise<LoginState>{
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  try {
    if(!email || !password){
      return {error:"Email and password are required"}
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include",
      body: JSON.stringify({
        email,password
      }
      )
    })

    const data = await response.json();

    if(!response.ok){
      return {
        error: data.message,
        fieldErrors:data.errors
      }
    }

    return {
      user: {
        id: data.user.user.id,
        name: data.user.user.name,
        email: data.user.user.email,
        role: data.user.user.role,
    },
    };
  } catch (error) {
     return {
      error:  "Server unreachable. Please try again later.",
    };
  }
}