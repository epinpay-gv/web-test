"use client";
import { useState, useEffect } from "react";
import { getWallet } from "@/features/user/user.service";
import { WalletDepositHistory } from "@/features/user/user.types";

export function useWallet(currencyId: string) {
  const [depositHistory, setDepositHistory] = useState<WalletDepositHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currencyId) {
      setIsLoading(false);
      return;
    }
    async function fetchWallet() {
      setIsLoading(true);
      try {
        const res = await getWallet(currencyId);
        setDepositHistory(res.depositHistory ?? []);
      } catch (err) {
        console.error("Wallet fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWallet();
  }, [currencyId]);

  return { depositHistory, isLoading };
}
