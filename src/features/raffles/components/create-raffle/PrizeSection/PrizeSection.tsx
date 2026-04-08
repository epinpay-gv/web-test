"use client";

import React from 'react';
import { SectionProps } from "../../../raffle.types";
import { PrizeSearchInput } from "./PrizeSearchInput";
import { Product } from "@/types/types";
import { Button } from "@/components/common";
import PrizeWinnerReserveSection from "./PrizeWinnerReserveSection";
import { usePrizeSection } from "../../../hooks/usePrizeSection";
import { PrizeButtonSection } from './PrizeButtonSection';

export function PrizeSection(props: SectionProps) {
  const { data, onPrev } = props;
  const {
    winnerCount, setWinnerCount, reserveCount, setReserveCount,
    totalPrizeCount, totalAmount, updatePrize, addPrizeRow, 
    handleRemoveOrClear, handleNextStep, isFormValid, canAddMore
  } = usePrizeSection(props);

  const prizes = data.prizes || [];

  return (
    <div className=" p-6 h-full bg-[#0d121a]/20 rounded-l-(--radius-base) border border-gray-800 flex flex-col justify-between">
      <div className='space-y-6'>
        <div className="border-b border-(--border-default) pb-4 text-(--text-body) font-medium">
          Çekiliş oluşturuluyor
        </div>     
        
        <div className="text-(--text-heading) font-semibold">Ödül bilgileri</div>
        
        <div className="space-y-4">
          {prizes.length > 0 ? (
            prizes.map((prize, index) => (
              <div key={`prize-row-${index}`} className="flex flex-col md:flex-row justify-between gap-4 w-full items-end">
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
                  <label className="text-sm font-medium leading-5 text-(--text-heading) flex justify-between">
                    <span>Adet</span>
                    {prize.id && (
                      <span className={prize.count >= prize.totalStock ? "text-(--text-fg-danger)" : "text-(--text-fg-brand)"}>
                        Stok: {prize.totalStock}
                      </span>
                    )}
                  </label>
                  <input
                    type="number"
                    value={prize.count}
                    onChange={(e) => updatePrize(index, { count: Number(e.target.value) })}
                    className={`w-full bg-(--bg-neutral-secondary-medium) border rounded-xl p-3 text-sm text-white focus:border-cyan-500 outline-none ${
                      prize.id && prize.count >= prize.totalStock ? "border-(--border-danger)" : "border-(--border-default-medium)"
                    }`}
                  />
                </div>            

                {/* Kaldır butonu logic: 
                    - Eğer tek satır varsa sadece id doluysa göster (temizleme işlemi için).
                    - Eğer birden fazla satır varsa her zaman göster (silme işlemi için). */}
                {(prizes.length > 1 || !!prize.id) && (
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
              <span className="text-sm text-(--text-body)">Henüz bir ödül eklenmedi.</span>
            </div>
          )}

          <div className="w-fit">
            <Button 
              variant="brand" 
              text="+ Ödül ekle" 
              onClick={addPrizeRow} 
              disabled={!canAddMore}
              className={!canAddMore ? "opacity-50 cursor-not-allowed" : ""}
            />
          </div>
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
          onNext={handleNextStep}
          disabled={!isFormValid}
          onPrev={onPrev}
          />
      </div>
      
    </div>
  );
}