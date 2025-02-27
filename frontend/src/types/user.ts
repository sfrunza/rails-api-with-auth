export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  additional_email?: string | null;
  additional_phone?: string | null;
  role: string;
  active: boolean;
  created_at?: Date;
}