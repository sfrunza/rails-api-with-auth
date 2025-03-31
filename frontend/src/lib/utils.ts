import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import parsePhoneNumberFromString from "libphonenumber-js";
import { format } from "date-fns";

const COUNTRY = "US";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhone(value: string | undefined): string {
  if (!value) return "";
  const phoneNumber = parsePhoneNumberFromString(value, COUNTRY)
  return phoneNumber ? phoneNumber.formatNational() : value
}

export function formatDate(date: string | Date | null | undefined) {
  if (!date) return "TBD";
  const dt = new Date(date);
  const dtDateOnly = new Date(
    dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000,
  );
  return format(dtDateOnly, "PPP");
}
