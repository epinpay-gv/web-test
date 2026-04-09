import { useState, useEffect, useCallback } from 'react';
import { getRaffleById } from '../raffles.service';
import { Raffle } from '@/types/types';

export const useRaffle = (raffleId: string) => {
  const [raffle, setRaffle] = useState<Raffle | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRaffle = useCallback(async () => {
    if (!raffleId) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const data = await getRaffleById(raffleId);
      setRaffle(data);
    } catch (err) {      
      const errorMessage = err instanceof Error ? err.message : "Çekiliş yüklenirken bir hata oluştu";
      setError(errorMessage);
      console.error("useRaffle Error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [raffleId]);

  useEffect(() => {
    fetchRaffle();
  }, [fetchRaffle]);

  return {
    raffle,
    isLoading,
    error,
    refresh: fetchRaffle
  };
};