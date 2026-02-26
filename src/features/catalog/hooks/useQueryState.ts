"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useQueryState() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setQuery = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const setMultipleQuery = (entries: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(entries).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return { setQuery, setMultipleQuery };
}