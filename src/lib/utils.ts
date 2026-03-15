import { clsx, type ClassValue } from "clsx";
import { SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* Formats date according to TUrkish format DD.MM.YYYY */
export function formatDateTR(date: string | Date | undefined | null) {
  if (!date) return "-";

  let parsedDate: Date;

  if (typeof date === "string") {
    const isTurkishFormat = /^\d{2}\.\d{2}\.\d{4}$/.test(date);// Turkish format DD.MM.YYYY
    const normalizedDate = isTurkishFormat
      ? date.split(".").reverse().join("-") // "12.06.2025" → "2025-06-12"
      : date; // ISO strings like "2025-06-12T09:22:00.000Z" pass through as-is

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

/* Calculates time difference between today and the given date */
export function getTimeLeft(targetDate: string | Date | undefined | null): string {
  if (!targetDate) return "-";

  const target = typeof targetDate === "string" ? new Date(targetDate) : targetDate;

  if (isNaN(target.getTime())) {
    console.error("Hatalı tarih formatı geldi:", targetDate);
    return "-";
  }

  const now = new Date();
  const diffMs = target.getTime() - now.getTime();

  if (diffMs <= 0) return "Sona erdi";

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  if (days > 0) return `${days} gün`;
  if (hours > 0) return `${hours} saat`;
  if (minutes > 0) return `${minutes} dakika`;
  return `${seconds} saniye`;
}

export const getCookie = (name: string): string | undefined => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
};

export const handleRequest = async <T>(
    request: () => Promise<T>,
    successMessage: string,
    setLoading: (value: SetStateAction<boolean>) => void
  ): Promise<T | undefined> => {
    try {
      setLoading(true);
      const response = await request();
      toast.success(successMessage);
      return response;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Bir hata oluştu";
      toast.error(message);
      return undefined;
    } finally {
      setLoading(false);
    }
  };