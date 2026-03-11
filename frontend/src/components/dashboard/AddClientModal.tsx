"use client";

import React, { useEffect } from 'react'
import { useState } from "react";
import { Client } from '@/types/client';
import { z } from "zod";
import { createClient, updateClient } from '@/services/client.service';
import toast from 'react-hot-toast';
import Input from './ui/Input';
 import ErrorInput from './Error'; 
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

type AddClientProps = {
  onClose: () => void;
  onClientSaved: (client: Client) => void;
  existingClient?: Client | null;
};

const clientSchema = z.object({
  name: z.string().min(2,"At least 2 characters"),
  email: z.string().email("Invalid email format")
})

function AddClientModal({onClose,onClientSaved,existingClient}:AddClientProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  useEffect(()=>{
    if (existingClient) {
    setName(existingClient.name);
    setEmail(existingClient.email);
  }
  },[existingClient])

  async function handleSubmit(e:any){
    e.preventDefault();

   const result = clientSchema.safeParse({ name, email }); 

   if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;

    setErrors({
      name: fieldErrors.name?.[0],
      email: fieldErrors.email?.[0],
    });

    return;
  }

  setErrors({});
  setLoading(true);

    try {
      const isEdit = !!existingClient;

      let response;

      if (isEdit && existingClient) {
        response = await updateClient(existingClient.id, { name, email }); 
      } else {
        response = await createClient({ name, email }); 
      }

       onClientSaved(response.client); 
       toast.success(response.message); 
       onClose();

    } catch (error: unknown) {
      if (error instanceof Error) {
              toast.error(error.message);
        } else {
              toast.error("Unexpected error occurred")
            }
    } finally{
      setLoading(false);
    }
  }
  useGSAP(()=>{
  gsap.from(".modal",{scale:0,opacity:0,ease:"power1.inOut",duration:0.8})
  },[]);

  return (
    <div className="px-3 fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="modal bg-zinc-800 p-6 rounded-lg w-full max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-4">
          {existingClient ? "Edit Client" : "Add New Client"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input placeholder='Client name' name='name' value={name} setInput={setName} />
            {errors.name && <ErrorInput message={errors.name} />} 
          </div>
           
          <div>
            <Input placeholder='Client email' name='email' value={email} setInput={setEmail} />
            {errors.email && <ErrorInput message={errors.email} />}
          </div>
          
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="bg-zinc-600 text-zinc-300 px-4 py-2 rounded cursor-pointer">
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded cursor-pointer transition duration-300"
            >
              {loading
                ? "Saving..."
                : existingClient
                ? "Update"
                : "Create"
                }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddClientModal;
 
