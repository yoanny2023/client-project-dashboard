import { Project } from '@/types/project';
import React, { useEffect } from 'react'
import { ProjectFormValues, projectSchema } from '@/app/dashboard/schemas/project.schema';
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectFormValues) => Promise<void>;
  currentProject?: Project | null;
  
}

function ProjectModal({open,onClose,onSubmit,currentProject}: Props) {

  const {register,handleSubmit,reset,formState: { errors,isSubmitting }} = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(()=>{
    if (!open) return;

    if (currentProject) {
      reset({
        name: currentProject.name,
        description: currentProject.description || "",
      });
    } else {
      reset({
        name: "",
        description: "",
      });
    } 
  },[open]);

   useGSAP(()=>{
    if(!open) return;
   
    gsap.from(".modal",{y:40,scale:0.5,opacity:0,ease:"power2.out",duration:0.5})
  },[open]);
   
    if (!open) return null;

    return (
      <div className="p-3 fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">

        <div className="modal bg-zinc-900/90 backdrop-blur-xl border border-zinc-700 p-6 rounded-2xl w-full max-w-md space-y-4 shadow-xl">

        <h2 className="text-xl font-bold">
          {currentProject ? "Edit Project" : "Add Project"}
        </h2>

        <form onSubmit={handleSubmit(async (data:ProjectFormValues) => {
          console.log("sumitting:",isSubmitting)
          await onSubmit(data);
          onClose();
        })}
        className="space-y-4"
        >
            <div>
              <input
                {...register("name")}
                className="w-full p-2 rounded bg-zinc-800 outline-none focus:ring-2 focus:ring-indigo-500 
                transition duration-300"
                placeholder="Project name"
              />

              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <textarea
                {...register("description")}
                className="w-full p-2 rounded bg-zinc-800 outline-none focus:ring-2 focus:ring-indigo-500
                transition duration-300"
                placeholder="Description"
              />

               {errors.description && (
                <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>
         
            <div className="flex justify-end gap-4">
              <button type='button'
                className='bg-zinc-600 text-zinc-300 px-4 py-2 rounded-md cursor-pointer' 
                disabled={isSubmitting}
                onClick={onClose}
                >
                  Cancel
              </button>
              <button
                disabled={isSubmitting}
                className={`text-white px-4 py-2 rounded-md cursor-pointer transition duration-300
                  ${isSubmitting
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
                }  
                `}>
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
        </form>
      </div>
    </div>
    )
}

export default ProjectModal

