"use client";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { getOrders } from "@/features/user/user.service";
import { BffOrder, BffOrdersMeta } from "@/features/user/user.types";

export function useOrders() {
  const [orders, setOrders] = useState<BffOrder[]>([]);
  const [meta, setMeta] = useState<BffOrdersMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const search: Record<string, string> = {};
      searchParams.forEach((value, key) => { search[key] = value; });
      const res = await getOrders(search);
      setOrders(res.orders);
      setMeta(res.meta);
    } catch (err) {
      console.error("Orders fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { orders, meta, isLoading, refetch: fetchOrders };
}
