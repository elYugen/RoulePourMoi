import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  uuid: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
  phone: z.string(),
  birth_date: z.string().nullable(),
  status: z.string(),
  roles: z.array(z.string()).default([]),
  avatar_url: z.string().nullable().optional(),
  created_at: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const authResponseSchema = z.object({
  user: userSchema,
  token: z.string(),
  expires_at: z.string(),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;
