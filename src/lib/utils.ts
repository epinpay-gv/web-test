import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTR(date: string | Date | undefined | null) {
  if (!date) return "-";

  let parsedDate: Date;

  if (typeof date === "string") {
    const normalizedDate = date.includes(".") 
      ? date.split(".").reverse().join("-") 
      : date;
      
    parsedDate = new Date(normalizedDate);
  } else {
    parsedDate = date;
  }
  if (isNaN(parsedDate.getTime())) {
    console.error("Hatalı tarih formatı geldi:", date);
    return "-";
  }

  return new Intl.DateTimeFormat("tr-TR").format(parsedDate);
}