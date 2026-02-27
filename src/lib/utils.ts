import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTR(dateString: string | Date) {
  return new Intl.DateTimeFormat("tr-TR").format(new Date(dateString));
}
