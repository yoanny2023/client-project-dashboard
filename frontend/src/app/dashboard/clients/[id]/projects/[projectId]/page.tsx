"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProjectById } from "@/services/project.service";
import { Project } from "@/types/project";
import toast from "react-hot-toast";
import { IconArrowBack } from "@tabler/icons-react";
import Loading from "@/components/commom/Loading";
import { useAuth } from "@/contexts/AuthContext";

export default function ProjectDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const{user} = useAuth();

  const clientId = params.id as string;
  const projectId = params.projectId as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      try {
        if (!clientId || !projectId) return;

        const data = await getProjectById(clientId, projectId);
        setProject(data);
      } catch {
        toast.error("Failed to load project");
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [clientId, projectId]);

  if (loading) {
    return <Loading />;
  }

  if (!project) {
    return <div className="p-6">Project not found.</div>;
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 cursor-pointer transition duration-200"
      >
        <IconArrowBack size={18} />
        Back
      </button>

      <h1 className="text-2xl font-bold">
        Project Details
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-[650px] w-full bg-zinc-800 rounded-lg">
          <tbody className="divide-y divide-zinc-700">

            <tr className="text-zinc-300 hover:bg-zinc-950 transition duration-500">
              <td className="px-3 py-3 md:px-6 md:py-4 font-semibold whitespace-nowrap">ID</td>
              <td className="px-3 py-3 md:px-6 md:py-4 break-words">{project.id}</td>
            </tr>

            <tr className="text-zinc-300 hover:bg-zinc-950 transition duration-500">
              <td className="px-3 py-3 md:px-6 md:py-4 font-semibold whitespace-nowrap">Name</td>
              <td className="px-3 py-3 md:px-6 md:py-4 break-words">{project.name}</td>
            </tr>

            <tr className="text-zinc-300 hover:bg-zinc-950 transition duration-500">
              <td className="px-3 py-3 md:px-6 md:py-4 font-semibold whitespace-nowrap">Client ID</td>
              <td className="px-3 py-3 md:px-6 md:py-4 break-words">{project.clientId}</td>
            </tr>

            <tr className="text-zinc-300 hover:bg-zinc-950 transition duration-500">
              <td className="px-3 py-3 md:px-6 md:py-4 font-semibold whitespace-nowrap">Owner ID</td>
              <td className="px-3 py-3 md:px-6 md:py-4 break-words">{project.ownerId}</td>
            </tr>
            <tr className="text-zinc-300 hover:bg-zinc-950 transition duration-500">
              <td className="px-3 py-3 md:px-6 md:py-4 font-semibold whitespace-nowrap">Owner Name</td>
              <td className="px-3 py-3 md:px-6 md:py-4 break-words">{user?.name}</td>
            </tr>

            <tr className="text-zinc-300 hover:bg-zinc-950 transition duration-500">
              <td className="px-3 py-3 md:px-6 md:py-4 font-semibold whitespace-nowrap">Description</td>
              <td className="px-3 py-3 md:px-6 md:py-4 break-words">
                {project.description || "—"}
              </td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  );
}