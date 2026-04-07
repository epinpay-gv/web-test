'use client';

import { useEffect, useMemo, useCallback } from "react";
import { SectionProps, RafflePrize } from "../../../raffle.types";
import { PrizeSearchInput } from "./PrizeSearchInput";
import { Product } from "@/types/types";
import { TrashBin } from "flowbite-react-icons/outline";
import { toast } from "react-toastify";
import { Button } from "@/components/common";

export function PrizeSection({ data, onUpdate, onNext, onPrev }: SectionProps) {

  const { totalAmount, totalQuantity } = useMemo(() => {
    const prizes = data.prizes || [];
    return prizes.reduce((acc, prize) => {
      acc.totalAmount += (prize.price || 0) * (prize.count || 0);
      acc.totalQuantity += (prize.count || 0);
      return acc;
    }, { totalAmount: 0, totalQuantity: 0 });
  }, [data.prizes]);

  useEffect(() => {
    const hasAmountChanged = data.amount !== totalAmount;
    const hasCountChanged = data.prizeCount !== totalQuantity;

    if (hasAmountChanged || hasCountChanged) {
      onUpdate({ 
        amount: totalAmount, 
        prizeCount: totalQuantity 
      });
    }
  }, [totalAmount, totalQuantity, data.amount, data.prizeCount, onUpdate]);

  useEffect(() => {
    if (!data.prizes || data.prizes.length === 0) {
      onUpdate({ 
        prizes: [{ id: '', name: '', count: 1, price: 0, totalStock: 999 }] 
      });
    }
  }, [data.prizes, onUpdate]);

  
  const updatePrize = (index: number, updatedFields: Partial<RafflePrize>) => {
    const newPrizes = [...(data.prizes || [])];
    const currentPrize = newPrizes[index];

    if (currentPrize) {
      let validatedCount = updatedFields.count;

      if (validatedCount !== undefined) {
        const stockLimit = updatedFields.totalStock ?? currentPrize.totalStock;
        
        if (validatedCount > stockLimit) {
          toast.error(`${currentPrize.name || 'Ürün'} için stok sınırı: ${stockLimit}`, {
            toastId: `stock-limit-${index}`,
            theme: "dark"
          });
          validatedCount = stockLimit;
        } else if (validatedCount < 1) {
          validatedCount = 1;
        }
      }

      newPrizes[index] = { 
        ...currentPrize, 
        ...updatedFields,
        count: validatedCount !== undefined ? validatedCount : currentPrize.count 
      };
      onUpdate({ prizes: newPrizes });
    }
  };

  const addPrizeRow = useCallback(() => {
    const currentPrizes = data.prizes || [];
    onUpdate({ 
      prizes: [...currentPrizes, { id: '', name: '', count: 1, price: 0, totalStock: 999 }] 
    });
  }, [data.prizes, onUpdate]);

  const handleRemoveOrClear = (index: number) => {
    const currentPrizes = data.prizes || [];
    if (currentPrizes.length > 1) {
      onUpdate({ prizes: currentPrizes.filter((_, i) => i !== index) });
    } else {
      onUpdate({ 
        prizes: [{ id: '', name: '', count: 1, price: 0, totalStock: 999 }] 
      });
      toast.info("Satır temizlendi.", { toastId: "clear-info", theme: "dark" });
    }
  };

  const handleNextStep = () => {
    const isInvalid = data.prizes?.some(p => !p.id || p.count < 1);
    if (isInvalid || !data.prizes || data.prizes.length === 0) {
      toast.warning("Lütfen tüm ödülleri seçin.", { theme: "dark" });
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6 p-6 bg-[#0d121a]/20 rounded-xl border border-gray-800">
      <div className="border-b border-(--border-default) pb-4 text-(--text-body) font-medium">
        Çekiliş oluşturuluyor
      </div>     
      <div className="text-(--text-heading)">Ödül bilgileri</div>
      <div className="space-y-4">
        {(data.prizes || []).map((prize, index) => (
          <div key={`prize-row-${index}`} className="flex justify-between gap-4 w-full">
            <div className="w-full flex flex-col gap-1">
              <label className="text-sm font-medium leading-5 text-(--text-heading)">Ürün adı</label>
              <PrizeSearchInput 
                placeholder="Ürün ara"
                selectedValue={prize.name}
                onSelect={(product: Product) => updatePrize(index, { 
                    id: String(product.id), 
                    name: product.translation.name,
                    price: product.basePrice ?? 0,
                    totalStock: product.totalStock ?? 0,
                    image: product.translation.imgUrl 
                })} 
              />
            </div>
            
            <div className="w-full flex flex-col gap-1 max-w-36">
              <label className="text-sm font-medium leading-5 text-(--text-heading) flex  justify-between">
                <span>Adet</span>
                {prize.id && (
                  <span className={prize.count >= prize.totalStock ? "text-(--text-fg-danger)" : "text-(--text-fg-brand)"}>
                    Stok: {prize.totalStock}
                  </span>
                )}
              </label>
              <input
                type="number"
                min={1}
                max={prize.totalStock}
                value={prize.count}
                onChange={(e) => updatePrize(index, { count: Number(e.target.value) })}
                className={`w-full bg-(--bg-neutral-secondary-medium) border rounded-(--radius-base) p-3 text-sm text-white focus:border-cyan-500 outline-none ${
                  prize.id && prize.count >= prize.totalStock ? "border-(--border-danger)" : "border-(--border-default-medium)"
                }`}
              />
            </div>            

            <div className="md:col-span-1 flex justify-center">
              <button 
                type="button" 
                onClick={() => handleRemoveOrClear(index)} 
                className="p-2 text-(--text-heading) hover:text-(--text-heading)/70 transition-colors"
              >
                Kaldır
              </button>
            </div>
          </div>
        ))}

        <div className="w-fit">
          <Button 
            variant="brand"
            text="+ Ödül ekle" 
            onClick={addPrizeRow}                    
          />
        </div>
         
      </div>

      <div className="flex gap-4 pt-6 border-t border-gray-800">
        <button 
            type="button"
            onClick={onPrev} 
            className="flex-1 py-3.5 rounded-xl bg-gray-800 text-white text-sm font-semibold hover:bg-gray-700 transition-all"
        >
            Geri Dön
        </button>
        <button 
            type="button"
            onClick={handleNextStep} 
            className="flex-2 py-3.5 rounded-xl bg-cyan-600 text-white text-sm font-bold hover:bg-cyan-500 shadow-lg shadow-cyan-900/20 transition-all"
        >
            {totalAmount > 0 ? `Ödemeye Geç (${totalAmount.toLocaleString('tr-TR')} ₺)` : 'İlerle'}
        </button>
      </div>
    </div>
  );
}