/* eslint-disable @typescript-eslint/no-explicit-any */ 
// handleRequest fonkisyonundaki any'ler hata veriyordu, o yüzden eslint disabled oldu
"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { JoinRaffleApiPayload } from "../raffle.types";
import { joinToRaffle } from "../raffles.service";


export function useRaffleActions() {
  const [loading, setLoading] = useState(false);

  const handleRequest = async (
    request: () => Promise<any>,
    successMessage: string,
  ) => {
    try {
      setLoading(true);
      await request(); 
      toast.success(successMessage);
    } catch (err: any) {
      toast.error(err.message || "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };


  const joinToTheRaffle = (payload: JoinRaffleApiPayload) =>
    handleRequest(() => joinToRaffle(payload), "Çekilişe katıldınız!");


  return {
    joinToTheRaffle,
    loading,
  };
}
