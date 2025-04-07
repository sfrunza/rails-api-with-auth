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

export function generatePagination(
  currentPage: number,
  totalPages: number
): (number | string)[] {

  const maxVisiblePages = 5;
  const pages: (number | string)[] = [];
  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  } else {
    pages.push(1);
  }

  if (currentPage > 3) {
    pages.push("...");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
}
