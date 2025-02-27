import { api } from "@/lib/api"

interface LoginRequest {
  email: string;
  password: string;
}

export interface SessionUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: "customer" | "admin" | "manager" | "foreman" | "driver" | "helper";
}

interface LoginResponse {
  token: string;
  user: SessionUser;
  error?: string;
}

interface SessionResponse {
  user: SessionUser
}

export async function login({ email, password }: LoginRequest) {
  const response = await api.post<LoginResponse>('/session', { email, password });
  return response.data
}

export async function logout() {
  return await api.delete('/session');
}

export async function verifyAuth() {
  const response = await api.get<SessionResponse>("/session")
  return response.data
} 