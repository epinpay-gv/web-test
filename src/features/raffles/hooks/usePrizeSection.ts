import { useState, useMemo, useEffect, useCallback } from "react";
import { RafflePrize, SectionProps } from "../raffle.types";
import { Product } from "@/types/types";
import { toast } from "react-toastify";

export function usePrizeSection({ data, onUpdate, onNext }: Partial<SectionProps>) {
  const [winnerCount, setWinnerCount] = useState<number | "">(1);
  const [reserveCount, setReserveCount] = useState<number | "">(1);

  const totalPrizeCount = useMemo(() => {
    return (data?.prizes || []).reduce((sum, p) => sum + (Number(p.count) || 0), 0);
  }, [data?.prizes]);

  const { totalAmount, totalQuantity } = useMemo(() => {
    const prizes = data?.prizes || [];
    return prizes.reduce((acc, prize) => {
      acc.totalAmount += (prize.price || 0) * (prize.count || 0);
      acc.totalQuantity += (prize.count || 0);
      return acc;
    }, { totalAmount: 0, totalQuantity: 0 });
  }, [data?.prizes]);

  useEffect(() => {
    const effectiveWinner = winnerCount === "" || winnerCount === 0 ? totalPrizeCount : (winnerCount as number);
    const effectiveReserve = reserveCount === "" ? 0 : (reserveCount as number);

    const updates: Partial<RaffleFormData> = {};
    if (data?.amount !== totalAmount) updates.amount = totalAmount;
    if (data?.prizeCount !== totalQuantity) updates.prizeCount = totalQuantity;
    if (data?.winnerCount !== effectiveWinner) updates.winnerCount = effectiveWinner;
    if (data?.reserveCount !== effectiveReserve) updates.reserveCount = effectiveReserve;

    if (onUpdate && Object.keys(updates).length > 0) {
      onUpdate(updates);
    }
  }, [totalAmount, totalQuantity, winnerCount, reserveCount, totalPrizeCount, data?.amount, data?.prizeCount, data?.winnerCount, data?.reserveCount, onUpdate]);

  const isOverLimit = useMemo(() => {
    const effectiveWinner = winnerCount === "" || winnerCount === 0 ? totalPrizeCount : winnerCount;
    return effectiveWinner > totalPrizeCount;
  }, [winnerCount, totalPrizeCount]);

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const isFormValid = useMemo(() => {
    const hasPrizes = data?.prizes && data.prizes.length > 0;
    const allSelected = hasPrizes && !data?.prizes?.some(p => !p.id || p.count < 1);
    return !!hasPrizes && allSelected && !isOverLimit;
  }, [data?.prizes, isOverLimit]);

  // Sıralı ekleme kontrolü: Son ödülün id'si var mı?
  const canAddMore = useMemo(() => {
    if (!data?.prizes || data.prizes.length === 0) return true;
    return !!data.prizes[data.prizes.length - 1].id;
  }, [data?.prizes]);

  const updatePrize = (index: number, updatedFields: Partial<RafflePrize>) => {
    if (!onUpdate) return;
    const newPrizes = [...(data?.prizes || [])];
    const currentPrize = newPrizes[index];

    if (currentPrize) {
      let vCount = updatedFields.count;
      if (vCount !== undefined) {
        const limit = updatedFields.totalStock ?? currentPrize.totalStock;
        if (vCount > limit) {
          toast.error(`${currentPrize.name} stok sınırı: ${limit}`, { theme: "dark" });
          vCount = limit;
        } else if (vCount < 1) vCount = 1;
      }
      newPrizes[index] = { ...currentPrize, ...updatedFields, count: vCount ?? currentPrize.count };
      onUpdate({ prizes: newPrizes });
    }
  };

  const addPrizeRow = useCallback(() => {
    if (!onUpdate || !canAddMore) return;
    onUpdate({ 
      prizes: [...(data?.prizes || []), { id: '', productId: '', offerId: '', name: '', count: 1, price: 0, totalStock: 999 }] 
    });
  }, [data?.prizes, onUpdate, canAddMore]);

  const handleRemoveOrClear = (index: number) => {
    if (!onUpdate) return;
    const current = data?.prizes || [];
    
    // Eğer tek satır varsa veya ilk satırsa ve id'si varsa satırı silme, içini temizle
    if (current.length === 1) {
      onUpdate({ 
        prizes: [{ id: '', productId: '', offerId: '', name: '', count: 1, price: 0, totalStock: 999 }] 
      });
    } else {
      // Birden fazla satır varsa o indeksi tamamen uçur
      onUpdate({ prizes: current.filter((_, i) => i !== index) });
    }
  };

  return {
    winnerCount, setWinnerCount,
    reserveCount, setReserveCount,
    totalPrizeCount, totalAmount,
    updatePrize, addPrizeRow, handleRemoveOrClear, 
    handleNextStep: () => isFormValid && onNext?.(),
    isOverLimit, isFormValid, canAddMore
  };
}