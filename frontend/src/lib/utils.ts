import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import parsePhoneNumberFromString from "libphonenumber-js";

const COUNTRY = "US";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhone(value: string | undefined): string {
  if (!value) return "";
  const phoneNumber = parsePhoneNumberFromString(value, COUNTRY)
  return phoneNumber ? phoneNumber.formatNational() : value
}
