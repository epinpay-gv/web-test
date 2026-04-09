"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { SectionProps } from "../../../raffle.types";
import { PrizeSearchInput } from "./PrizeSearchInput";
import { Product } from "@/types/types";
import { Button } from "@/components/common";
import PrizeWinnerReserveSection from "./PrizeWinnerReserveSection";
import { usePrizeSection } from "../../../hooks/usePrizeSection";
import { PrizeButtonSection } from './PrizeButtonSection';
import { cn } from '@/lib/utils';
import { createRaffleApi, updateRaffleApi } from "../../../raffles.service";

export function PrizeSection(props: SectionProps) {
  const { data, editMode, onPrev, onNext } = props;
  const [isPending, setIsPending] = useState(false);

  const {
    winnerCount, setWinnerCount, reserveCount, setReserveCount,
    totalPrizeCount, updatePrize, addPrizeRow, 
    handleRemoveOrClear, isFormValid, canAddMore
  } = usePrizeSection(props);

  const prizes = data.prizes || [];
  
  const selectedProductIds = useMemo(() => {
    return prizes.map(p => p.id).filter(id => !!id) as string[];
  }, [prizes]);

  useEffect(() => {
    if (prizes.length === 0) {
      addPrizeRow();
    }
  }, []);
 
  useEffect(() => {
    if (winnerCount === 0 && totalPrizeCount > 0) {
      setWinnerCount(totalPrizeCount);
    }
  }, [totalPrizeCount, winnerCount, setWinnerCount]);
  
  const handleFinalAction = async () => {
    if (!isFormValid) return;

    setIsPending(true);
    try {
      if (editMode && data.id) {
        const response = await updateRaffleApi(data.id, data);
        if (response?.success) {
          alert(response.message || "Çekiliş başarıyla güncellendi.");
        }
      } else {
        const response = await createRaffleApi(data);
        if (response?.success) {
          alert(response.message || "Çekiliş başarıyla oluşturuldu.");
          if (onNext) onNext();
        }
      }
    } catch (error) {
      console.error("İşlem hatası:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="p-6 h-full bg-[#0d121a]/20 rounded-l-(--radius-base) border border-gray-800 flex flex-col justify-between">
      <div className='space-y-6'>
        <div className="border-b border-(--border-default) pb-4 text-(--text-body) font-medium">
          {editMode ? "Çekiliş bilgileri düzenleniyor" : "Çekiliş oluşturuluyor"}
        </div>     
        
        <div className="text-(--text-heading) font-semibold">Ödül bilgileri</div>
        
        {/* editMode kısıtlamaları */}
        <div className={cn(
          "space-y-4 transition-all duration-300", 
          editMode ? "opacity-40 pointer-events-none select-none" : ""
        )}>
          {prizes.length > 0 ? (
            prizes.map((prize, index) => (
              <div key={`prize-row-${index}`} className="flex flex-col md:flex-row justify-between gap-4 w-full items-end">
                <div className="w-full flex flex-col gap-1">
                  <label className="text-sm font-medium leading-5 text-(--text-heading)">Ürün adı</label>
                  <PrizeSearchInput 
                    editMode={editMode}
                    placeholder="Ürün ara"
                    selectedValue={prize.name}                  
                    excludedIds={selectedProductIds.filter(id => id !== prize.id)}
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
                  <label className="text-sm font-medium leading-5 text-(--text-heading) flex justify-between">
                    <span>Adet</span>
                    {prize.id && (
                      <span className={prize.count >= (prize.totalStock ?? 0) ? "text-(--text-fg-danger)" : "text-(--text-fg-brand)"}>
                        Stok: {prize.totalStock}
                      </span>
                    )}
                  </label>
                  <input
                    type="number"
                    value={prize.count}
                    min={1}
                    onChange={(e) => updatePrize(index, { count: Number(e.target.value) })}
                    className={cn(
                        "input w-full bg-(--bg-neutral-secondary-medium) border rounded-xl p-3 text-sm text-white focus:border-cyan-500 outline-none transition-all",
                        prize.id && prize.count >= (prize.totalStock ?? 0) ? "border-(--border-danger)" : "border-(--border-default-medium)",
                        "disabled:bg-(--bg-disabled) disabled:text-(--text-fg-disabled) disabled:cursor-not-allowed"
                    )}
                    disabled={editMode}
                  />
                </div>            
                
                {!editMode && (prizes.length > 1 || !!prize.id) && (
                  <button 
                    type="button" 
                    onClick={() => handleRemoveOrClear(index)} 
                    className="py-3 px-4 text-sm text-(--text-heading) hover:text-(--text-heading)/80 transition-colors"
                  >
                    {prizes.length === 1 ? 'Temizle' : 'Kaldır'}
                  </button>
                )}
              </div>
            ))
          ) : (            
            <div className="py-10 border-2 border-dashed border-gray-800 rounded-xl flex flex-col items-center justify-center gap-3">
              <span className="text-sm text-(--text-body)">Yükleniyor...</span>
            </div>
          )}
          
          {!editMode && (
            <div className="w-fit">
              <Button 
                variant="brand" 
                text="+ Ödül ekle" 
                onClick={addPrizeRow} 
                disabled={!canAddMore}
                className={!canAddMore ? "opacity-50 cursor-not-allowed" : ""}
              />
            </div>
          )}
        </div>

        <div className="pt-6">
          <PrizeWinnerReserveSection 
            winnerCount={winnerCount}
            reserveCount={reserveCount}
            onWinnerChange={setWinnerCount}
            onReserveChange={setReserveCount}
            totalPrizeCount={totalPrizeCount}
          />
        </div>
      </div>

      <div className='bottom-0 relative'>
        <PrizeButtonSection 
          editMode={editMode}
          onNext={handleFinalAction} 
          disabled={!isFormValid || isPending}
          onPrev={onPrev}
        />
      </div>
    </div>
  );
}