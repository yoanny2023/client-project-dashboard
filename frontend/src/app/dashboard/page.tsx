"use client";

import {useState,useEffect} from "react"
import Skeleton from "@/components/ui/Skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { getClients } from "@/services/client.service";
import toast from "react-hot-toast";
import { getProjectsByClient } from "@/services/project.service";
import Link from "next/link";


function Dashboard() {
  const[clientsCount,setclientsCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);

  const[loading,setLoading] = useState(true)
  const{user} = useAuth();

  useEffect(()=>{

    async function loadClients(){
      try {
        const data = await getClients();
        setclientsCount(data.clients.length);

        let totalProjects = 0;

        for (const client of data.clients) {
          const projects = await getProjectsByClient(client.id);
          totalProjects += projects.length;
        }
   
        setProjectsCount(totalProjects);
        toast.success("Clients loaded!");

      } catch (error) {
        console.log("Failed to load clients");
        toast.error("Failed to load clients")
      }finally{
        setLoading(false)
      }
    } 

    loadClients();

  },[]);

   if(loading) return <Skeleton className="h-24 w-full" /> 

   return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold"> Welcome back, {user?.name} 👋 </h1>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">  
          <Link href="/dashboard/clients" className="cursor-pointer">
            <div className="bg-white/10 backdrop-blur-xl hover:bg-zinc-950 hover:shadow-indigo-500/50 border border-white/20 rounded-2xl p-6 shadow-lg
            scale-100 hover:scale-105 transition duration-500">
              <h2 className="text-lg font-semibold mb-2"> Total Clients </h2>
              <p className="text-4xl font-bold text-indigo-600"> {clientsCount} </p>
            </div>
          </Link>

        <div className="bg-white/10 backdrop-blur-xl hover:bg-zinc-950 hover:shadow-indigo-500/50 border border-white/20 rounded-2xl p-6 shadow-lg
          scale-100 hover:scale-105 transition duration-500">
          <h2 className="text-lg font-semibold mb-2"> Total Projects </h2>
          <p className="text-4xl font-bold text-indigo-600"> {projectsCount} </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard

