import {z} from "zod"
import { clientIdParam } from "./params.schema";

export const getClientSchema = z.object({
  params: clientIdParam,
});

export const createClientSchema = z.object({
  body: z.object({
   name: z.string().min(2,"At least 2 characters").trim(),
   email: z.string().email("Invalid email format").trim(),
  })
})  

export const updateClientSchema = z.object({
  params: clientIdParam,
  body: z.object({
    name: z.string().min(2,"At least 2 characters").trim().optional(),
    email: z.string().email("Invalid email format").trim().optional()
  }).refine(
      (data) => Object.keys(data).length > 0,
      {
        message: "At least one field must be provided",
        path: []
      }
    )
}) 

export const deleteClientSchema = getClientSchema;