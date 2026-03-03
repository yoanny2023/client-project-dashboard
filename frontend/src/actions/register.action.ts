"use server"
import { User } from "@/types/user";

type RegisterState = {
  error?: string;
  fieldErrors?: Record< string, string >;
  user?: Omit<User,"role">
};

export default async function registerAction(_prevState:RegisterState,formData: FormData):Promise<RegisterState>{
 
 const name = formData.get("name")?.toString() 
 const email = formData.get("email")?.toString() 
 const password = formData.get("password")?.toString()

 try {
  if(!name || !email || !password){
    return { error:"All fields are required" }
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`,{
    method: "POST",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name,email,password})
  });

    const data = await response.json();

    if(!response.ok){
      return {
        error: data.message,
        fieldErrors:data.errors
      }
    }
    return {
      user: data.user,
    };
  
 } catch (error) {
    return {
        error: "Server unavailable. Try again later.",
      };
 }
}
