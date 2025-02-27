import { api } from "@/lib/api";

type Settings = {
  company_name: string
  company_address: string
  company_phone: string
  company_email: string
  company_website: string
  company_logo: string
  floor_options: { id: number; name: string, value: string }[]
  move_size_options: { id: number; name: string, value: string, movers_count: number[][] }[]

}

export async function getSettings() {
  const response = await api.get<Settings>("settings")
  return response.data
}