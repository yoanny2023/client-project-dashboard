"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Client } from "@/types/client";
import toast from "react-hot-toast";
import Loading from "@/components/commom/Loading";
import { IconArrowBack } from "@tabler/icons-react";
import { getClientById } from "@/services/client.service";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function ClientDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const{user} = useAuth()

  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClient() {
      try {
        if (!id || typeof id !== "string") return;

        const data = await getClientById(id);
        setClient(data.client);
      } catch {
        toast.error("Failed to load client");
      } finally {
        setLoading(false);
      }
    }

    loadClient();
  }, [id]);

  useGSAP(()=>{
    if(!client) return;

     gsap.set(".header",{y:-40,opacity:0});
     gsap.set(".table-container",{y:40,opacity:0,scale:0.3});
     gsap.set(".link",{y:20,opacity:0,scale:0.3});

    const tl = gsap.timeline();

    tl.to(".header",{y:0,opacity:1,ease:"power1.out",duration:0.6})
    tl.to(".table-container",{y:0,opacity:1,scale:1,ease:"power3.inOut",duration:0.6},"<0.2")
    tl.to(".link",{y:0,opacity:1,scale:1,ease:"power3.inOut",duration:0.6})
  },[client])
   
  if (loading) return <Loading />

  if (!client) return <p className="p-6">Client not found.</p>;

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 py-2 text-indigo-600 hover:text-indigo-700 cursor-pointer transition duration-300"
      >
        <IconArrowBack size={18} stroke={1} />
        Back
      </button>

      <h1 className="header text-2xl font-bold mb-4">Client Details</h1>

      <div className="overflow-x-auto">
        <table className="table-container min-w-[650px] w-full bg-zinc-800 rounded-lg">
          <tbody className="divide-y divide-zinc-700">

            <tr className="text-zinc-300 hover:bg-zinc-950 transition duration-500">
              <td className="px-3 py-3 md:px-6 md:py-4 font-semibold">ID</td>
              <td className="px-3 py-3 md:px-6 md:py-4 break-words">{client.id}</td>
            </tr>

            <tr className="text-zinc-300 hover:bg-zinc-950 transition duration-500">
              <td className="px-3 py-3 md:px-6 md:py-4 font-semibold">Name</td>
              <td className="px-3 py-3 md:px-6 md:py-4 break-words">{client.name}</td>
            </tr>

            <tr className="text-zinc-300 hover:bg-zinc-950 transition duration-500">
              <td className="px-3 py-3 md:px-6 md:py-4 font-semibold">Email</td>
              <td className="px-3 py-3 md:px-6 md:py-4 break-words">{client.email}</td>
            </tr>

            <tr className="text-zinc-300 hover:bg-zinc-950 transition duration-500">
              <td className="px-3 py-3 md:px-6 md:py-4 font-semibold">Owner ID</td>
              <td className="px-3 py-3 md:px-6 md:py-4 break-words">{client.ownerId}</td>
            </tr>

            <tr className="text-zinc-300 hover:bg-zinc-950 transition duration-500">
              <td className="px-3 py-3 md:px-6 md:py-4 font-semibold">Owner Name</td>
              <td className="px-3 py-3 md:px-6 md:py-4 break-words">{user?.name}</td>
            </tr>

          </tbody>
        </table>
      </div>

      <div className="link">
        <Link href={`/dashboard/clients/${client.id}/projects`}
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded cursor-pointer transition duration-300">
          View Projects
        </Link>
      </div>
    </div>
  );
}