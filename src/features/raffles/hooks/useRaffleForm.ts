import { useState, useEffect } from 'react';
import { getRaffleById } from '../raffles.service';
import { Raffle } from '@/types/types';

export const useRaffleForm = (raffleId?: string) => {
  const [initialData, setInitialData] = useState<Raffle | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isEditMode = !!raffleId;

  useEffect(() => {
    if (isEditMode && raffleId) {
      const fetchRaffle = async () => {
        try {
          setIsLoading(true);
          const data = await getRaffleById(raffleId);
          setInitialData(data);
        } catch (err) {
          console.error("Raffle fetch error:", err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchRaffle();
    }
  }, [raffleId, isEditMode]);

  return { initialData, isLoading, isEditMode };
};