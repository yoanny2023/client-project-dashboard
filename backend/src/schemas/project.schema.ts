import {z} from "zod"
import { clientIdParam, projectIdParam } from "./params.schema";

export const createProjectSchema = z.object({
  params: clientIdParam,
  body: z.object({
    name: z.string().min(2,"At least 2 characters").trim(),
    description: z.string().min(2,"At least 2 characters").trim(),
  })
})

export const projectParamsSchema = z.object({
  params: clientIdParam.merge(projectIdParam),
});

export const updateProjectSchema = z.object({
  params: clientIdParam.merge(projectIdParam),
  body: z.object({
    name: z.string().min(2,"At least 2 characters").trim().optional(),
    description: z.string().trim().optional(),
  }).refine(
    data => Object.keys(data).length > 0,
    { 
      message: "At least one field must be provided",
      path: []
     }
  ),
})

export const deleteProjectSchema = projectParamsSchema;
export const getProjectSchema = projectParamsSchema;
