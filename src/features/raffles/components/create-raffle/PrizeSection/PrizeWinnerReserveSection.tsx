"use client";
import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ExclamationCircle } from 'flowbite-react-icons/outline';

interface PrizeWinnerReserveSectionProps {
  winnerCount: number | "";
  reserveCount: number | "";
  onWinnerChange: (val: number | "") => void;
  onReserveChange: (val: number | "") => void;
  totalPrizeCount: number;
}

export default function PrizeWinnerReserveSection({
  winnerCount,
  reserveCount,
  onWinnerChange,
  onReserveChange,
  totalPrizeCount
}: PrizeWinnerReserveSectionProps) {
  
  const effectiveWinner = winnerCount === "" || winnerCount === 0 ? totalPrizeCount : winnerCount;
  const isOverLimit = effectiveWinner > totalPrizeCount;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-base text-(--text-heading) font-semibold">          
          Kazanan ve yedek sayısı belirleme
        </h3>        
        <span className='text-(--text-body) text-sm font-normal'>
          Kazanın ve yedek belirlenmediği durumda ürün adedi kadar kazanan ve yedek belirlenir.
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-5 text-(--text-heading) ml-1">Kazanan sayısı</label>
          <input
            type="number"
            value={winnerCount}
            onChange={(e) => onWinnerChange(e.target.value === "" ? "" : Math.max(0, parseInt(e.target.value)))}
            className={`w-full bg-(--bg-neutral-secondary-medium) border ${isOverLimit ? 'border-red-500' : 'border-(--border-default-medium)'} rounded-xl px-3 py-2.5 text-(--text-heading) focus:ring-1 focus:ring-(--bg-brand) transition-all`}
            placeholder={totalPrizeCount.toString()} 
          />
          <span className='font-normal text-xs text-(--text-body)'>Opsiyonel</span>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-5 text-(--text-heading) ml-1">Yedek Sayısı</label>
          <input
            type="number"
            value={reserveCount}
            onChange={(e) => onReserveChange(e.target.value === "" ? "" : Math.max(0, parseInt(e.target.value)))}
            className="w-full bg-(--bg-neutral-secondary-medium) border border-(--border-default-medium) rounded-xl px-3 py-2.5 text-(--text-heading) focus:ring-1 focus:ring-(--bg-brand) transition-all"
            placeholder="0"
          />
          <span className='font-normal text-xs text-(--text-body)'>Opsiyonel</span>
        </div>
      </div>

      <AnimatePresence>
        {isOverLimit && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            <div className="mt-2 p-3  bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
              <ExclamationCircle className='text-xs text-(--text-fg-danger)'/>
              <p className="text-xs text-(--text-fg-danger)">
                Kazanan sayısı , toplam ödül miktarını aşıyor!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}