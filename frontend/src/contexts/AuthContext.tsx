"use client"

import { authService } from "@/services/auth.service";
import { User } from "@/types/user";
import React, { createContext, useContext, useEffect, useState } from "react";

  type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
    logout: () => Promise<void>;
};

const authContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}:{children: React.ReactNode}){

 const [user, setUser] = useState<User | null>(null);
 const [loading, setLoading] = useState(true);

 // on refresh app.
  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await authService.getMe();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
  }

  return (<authContext.Provider value={{user,loading,setUser,logout}}>
        {children}
      </authContext.Provider>
  )
}

export function useAuth(){
 const ctx =  useContext(authContext)
 if(!ctx) throw new Error("useAuth must be used inside AuthProvider");
 return ctx
} 