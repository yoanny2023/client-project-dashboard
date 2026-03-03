import z from "zod";

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format").trim(),
    password: z.string().min(6,"password must be at least 6 characters").trim()
  })
})

export const registerSchema = z.object({
  body:z.object({
    name: z.string().min(2,"At least 2 characters").trim(),
    email: z.string().email("Invalid email format").trim(),
    password: z.string().min(6,"password must be at least 6 characters").trim()
  })
})