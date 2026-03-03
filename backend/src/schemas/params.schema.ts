import { z } from "zod";

export const clientIdParam = z.object({
  clientId: z.string().uuid("Invalid client id"),
});

export const projectIdParam = z.object({
  id: z.string().uuid("Invalid project id"),
});
