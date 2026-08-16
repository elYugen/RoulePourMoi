import { api } from "./api";
import { authResponseSchema, type AuthResponse } from "../schemas/auth";

export type RegisterPayload = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  role?: "client" | "driver";
};

export type LoginPayload = {
  login: string;
  password: string;
};

function parseAuthResponse(data: unknown): AuthResponse {
  const result = authResponseSchema.safeParse(data);
  if (!result.success) {
    throw new Error("La réponse du serveur ne correspond pas au format attendu.");
  }
  return result.data;
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const response = await api.post("/auth/register", payload);
  return parseAuthResponse(response.data);
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const response = await api.post("/auth/login", payload);
  return parseAuthResponse(response.data);
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}
