import { z } from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .min(2, "At least 2 characters")
    .max(20, "Name is too long"),

  description: z
    .string()
    .max(100, "Description too long")
    .optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;