"use client";
import { useState, useEffect } from "react";
import { getOrderById } from "@/features/user/user.service";
import { BffOrderDetailApiResponse } from "@/features/user/user.types";

export function useOrderDetail(id: string) {
  const [order, setOrder] = useState<BffOrderDetailApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      setIsLoading(true);
      try {
        const res = await getOrderById(id);
        setOrder(res);
      } catch (err) {
        console.error("Order detail fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrder();
  }, [id]);

  return { order, isLoading };
}
