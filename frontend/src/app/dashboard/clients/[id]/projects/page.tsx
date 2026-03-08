"use client";

import { useParams,useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createProject, deleteProject, getProjectsByClient, updateProject} from "@/services/project.service";
import { Project } from "@/types/project";
import toast from "react-hot-toast";
import Loading from "@/components/commom/Loading";
import Link from "next/link";
import { IconArrowBack, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import ProjectModal from "@/components/dashboard/ProjectModal";
import DeleteProjectDialog from "@/components/dashboard/DeleteProjectDialog";
import { ProjectFormValues } from "@/app/dashboard/schemas/project.schema";

export default function ClientProjectsPage() {
  const params = useParams();
  const router = useRouter();

  const clientId = params.id as string;

  const[projects, setProjects] = useState<Project[]>([]);
  const[loading,setLoading] =  useState(true);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [search,setSearch] = useState("");

  useEffect(() => {

    async function loadProjects() {
      try {
        if (!clientId) return;
        const data = await getProjectsByClient(clientId);
        setProjects(data);
        toast.success("Projects loaded")
      } catch {
        toast.error("Failed to load projects");
      }finally{
        setLoading(false)
      }
    }

    if (clientId) loadProjects();
  }, [clientId]);

  async function handleCreate(data: ProjectFormValues):Promise<void>{
    try {
      const response = await createProject(clientId,data);
      setProjects((prev) => [response.project,...prev]);

      setIsModalOpen(false);
      toast.success(response.message);

    } catch (error:unknown) {
      if (error instanceof Error) {
        console.log(error.message)
        toast.error(error.message)
      } else {
        toast.error("Unexpected error occurred")
      }
    }
  }

  async function handleUpdate(data: ProjectFormValues):Promise<void> {
    if (!selectedProject) return;

    try {
      const response = await updateProject(clientId,selectedProject.id,data);

      setProjects((prev) =>
        prev.map((p) => (p.id === response.project.id ? response.project : p))
      );

      toast.success(response.message);

    } catch(error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error occurred")
      }
    }
}

  async function handleDelete(): Promise<void>{
    if (!projectToDelete) return;

    try {
      const response = await deleteProject(clientId, projectToDelete.id);

      setProjects((prev) => prev.filter((p) => p.id !== projectToDelete.id));
      toast.success(response.message);

    } catch(error: unknown) {
       if (error instanceof Error) {
        console.log(error.message)
        toast.error(error.message)
      } else {
        toast.error("Unexpected error occurred")
      }
    } finally {
      setProjectToDelete(null);
    }
}

  if (loading) return <Loading />

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
);

  return (
    <div className="space-y-6">
      <button onClick={() => router.back()}
        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 cursor-pointer transition duration-300">
          <IconArrowBack size={18} stroke={1} />
            Back
      </button>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button onClick={() => {
            setSelectedProject(null);
            setIsModalOpen(true);  
          }}
          className="flex gap-1 items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer px-4 py-2 rounded transition duration-300">
          <IconPlus stroke={2} size={18} /> Project
        </button>
      </div>

      <div className='bg-zinc-800 my-6 rounded-lg border border-zinc-600'>
        <input type="search" value={search} onChange={(e) => setSearch(e.target.value)}
        className='w-full px-4 py-2 outline-none focus:outline-none' placeholder='Search by name' />
      </div>

      {filteredProjects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
      <div className="overflow-x-auto">
        <table className="min-w-[750px] w-full bg-zinc-800 rounded-lg">
          <thead className="bg-zinc-700">
            <tr>
              <th className="px-3 py-3 md:px-6 md:py-3 text-left whitespace-nowrap">Name</th>
              <th className="px-3 py-3 md:px-6 md:py-3 text-left whitespace-nowrap">Description</th>
              <th colSpan={3} className="px-3 py-3 md:px-6 md:py-3 text-center whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-700">
            {filteredProjects.map(project => (
              <tr key={project.id} className="hover:bg-zinc-950 transition duration-500">
                <td className="px-3 py-3 md:px-6 md:py-4 break-words">{project.name}</td>
                <td className="px-3 py-3 md:px-6 md:py-4 break-words">{project.description || "—"}</td>
                <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap">
                  <Link href={`/dashboard/clients/${clientId}/projects/${project.id}`}
                    className="text-indigo-500 hover:underline">
                    View
                  </Link>
                </td>
                <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap space-x-2 sm:space-x-4">
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-700 cursor-pointer transition duration-300"
                    >
                      <IconPencil stroke={1} size={18} />
                    </button>

                    <button
                      onClick={() => setProjectToDelete(project)}
                      className="text-red-600 hover:text-red-700 cursor-pointer transition duration-300"
                    >
                      <IconTrash stroke={1} size={18} />
                    </button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

      <ProjectModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={selectedProject ? handleUpdate : handleCreate}
        currentProject={selectedProject}
      />
  
      <DeleteProjectDialog
        open={!!projectToDelete}
        onClose={() => setProjectToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
