"use client";
import { useState, useEffect } from "react";
import { getUserMe } from "@/features/user/user.service";
import { UserMeResponse } from "@/features/user/user.types";

export function useUserMe() {
  const [data, setData] = useState<UserMeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserMe() {
      setIsLoading(true);
      try {
        const res = await getUserMe();
        setData(res);
      } catch (err) {
        console.error("User me fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserMe();
  }, []);

  return { data, isLoading };
}
