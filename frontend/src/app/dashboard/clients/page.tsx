"use client"

import Loading from '@/components/commom/Loading';
import AddClientModal from '@/components/dashboard/AddClientModal';
import Skeleton from '@/components/ui/Skeleton';
import { deleteClient, getClients } from '@/services/client.service';
import { Client } from '@/types/client';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react'
import Link from 'next/link';
import React,{useState,useEffect} from 'react'
import toast from 'react-hot-toast';
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

function ClientPage() {

  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const [search,setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  useEffect(()=>{
   
    async function fetchClients(){
      try {
        const data = await getClients();

        setClients(Array.isArray(data.clients) ? data.clients : []);
        toast.success("Clients loaded successfully");
      
      } catch (error) {
       console.error("Fetch clients error:", error);
       toast.error("Failed to load clients");
      } finally{
        setLoading(false)
      }   
}
  
  fetchClients();
},[])

function handleClientSaved(client: Client) {
   setClients((prev) => {
    const exists = prev.find((c) => c.id === client.id);
    if (exists) {
      return prev.map((c) => (c.id === client.id ? client : c));
    }
    return [client, ...prev];
  });

}

async function handleDelete(id: string) {
  const confirmDelete = confirm("Are you sure?");
  if (!confirmDelete) return;

  try {
    const result = await deleteClient(id);

    setClients((prev) => prev.filter((c) => c.id !== id));
    toast.success(result.message);

  } catch (err: unknown) {
    if(err instanceof Error){
     console.log(err.message);
     toast.error(err.message);
    }else{
     toast.error("Unexpected error occurred")
     console.log("Unexpected error occurred");
    }
  }
}

  const filteredClients = clients.filter((client) =>
  client.name.toLowerCase().includes(search.toLowerCase())
);

  useGSAP(() => {
    if (filteredClients.length === 0) return;

    gsap.set(".page-title",{y:-20,opacity:0})
    gsap.set(".btn",{x:"100vw",opacity:0})
    gsap.set(".search-box",{y:-10,opacity:0})
    gsap.set(".table-container",{y:-20,opacity:0})

    const tl = gsap.timeline();

    tl.to(".page-title",{y:0,opacity:1,duration:0.5})
    tl.to(".btn",{x:0,opacity:1,ease:"bounce.inOut",duration:1})
    tl.to(".search-box",{y:0,opacity:1,duration:0.4})
    tl.to(".table-container",{y:0,opacity:1,duration:0.4})
  },[filteredClients])

  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title text-2xl font-semibold">Clients</h1>

        <button className="btn flex gap-1 items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded cursor-pointer transition duration-300"
        onClick={() => {
          setSelectedClient(null);
          setShowModal(true);
        }}
        >
          <IconPlus stroke={2} size={18} color="white" /> Client
        </button>
      </div>

      <div className='search-box bg-zinc-800 my-6 rounded-lg border border-zinc-600'>
        <input type="search" value={search} onChange={(e) => setSearch(e.target.value)}
        className='w-full px-4 py-2 outline-none focus:outline-none' placeholder='Search by name' />
      </div>

      <div className="table-container bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="min-w-175 w-full text-sm">
            <thead className="bg-zinc-700 text-left">
              <tr>
                <th className="whitespace-nowrap px-3 py-2 md:px-4 md:py-3">Name</th>
                <th className="whitespace-nowrap px-3 py-2 md:px-4 md:py-3">Email</th>
                <th className="whitespace-nowrap px-3 py-2 md:px-4 md:py-3">Status</th>
                <th colSpan={3} className="whitespace-nowrap px-3 py-2 md:px-4 md:py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {
                loading ? (
                <tr>
                  <td colSpan={6} className="p-6">
                    <Skeleton className="h-6 w-full" />
                  </td>
                </tr>
              ) : filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-zinc-500">
                    No clients found
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr
                    key={client.id}
                    className="border-t border-zinc-700 hover:bg-zinc-950 transition duration-500"
                  >
                    <td className="whitespace-nowrap px-3 py-2 md:px-4 md:py-3">{client.name}</td>
                    <td className="whitespace-nowrap px-3 py-2 md:px-4 md:py-3">{client.email}</td>
                    <td className="whitespace-nowrap px-3 py-2 md:px-4 md:py-3">
                      <span className="text-emerald-600">Active</span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 md:px-4 md:py-3">
                      <Link href={`/dashboard/clients/${client.id}`}
                          className="text-indigo-600 hover:underline hover:text-indigo-500 cursor-pointer transition duration-300">
                          View
                      </Link>
                    </td>
                    <td className='whitespace-nowrap'>
                      <span onClick={() => {
                        setSelectedClient(client);
                        setShowModal(true);
                      }}
                        className="text-blue-600 hover:text-blue-700 cursor-pointer transition duration-300">
                        <IconPencil stroke={1} size={18} />
                    </span>
                    </td>
                    <td className='whitespace-nowrap'>
                      <span onClick={() => handleDelete(client.id)}
                        className="text-red-600 hover:text-red-700 cursor-pointer transition duration-300">
                        <IconTrash stroke={1} size={18} />
                      </span>
                    </td>
                  </tr>
                ))
              )
              }
            </tbody>
          </table>
        </div>
      </div>
        {showModal && (
          <AddClientModal
            existingClient={selectedClient ?? undefined}
            onClose={() => {
              setShowModal(false);
              setSelectedClient(null);
            }}
            onClientSaved={handleClientSaved}
          />
        )}  
    </div>
 );
}

export default ClientPage;

