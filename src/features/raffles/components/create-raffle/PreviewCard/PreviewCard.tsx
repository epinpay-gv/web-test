"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ParticipationConstraint } from "@/types/types";
import PreviewImageSection from "./PreviewImageSection";
import PreviewCardInfo from "./PreviewCardInfo";
import PreviewStoreInfo from "./PreviewStoreInfo";
import { RaffleFormData } from "@/features/raffles/raffle.types";


interface PreviewCardProps {
  data: RaffleFormData;
}

export function getTimeLeft(targetDate: string | Date | undefined | null): string {
  if (!targetDate) return "-";
  const target = typeof targetDate === "string" ? new Date(targetDate) : targetDate;
  if (isNaN(target.getTime())) return "-";
  const now = new Date();
  const diffMs = target.getTime() - now.getTime();
  if (diffMs <= 0) return "Sona erdi";
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
  if (days > 0) return `${days} gün kaldı`;
  if (hours > 0) return `${hours} saat kaldı`;
  if (minutes > 0) return `${minutes} dakika kaldı`;
  return `${seconds} saniye kaldı`;
}

export default function PreviewCard({ data }: PreviewCardProps) {
  const [timeLeftLabel, setTimeLeftLabel] = useState("-");
  const hasPrizes = data.prizes.length > 0;
  const mainPrize = hasPrizes ? data.prizes[0] : null;
  const isImageLoading = !hasPrizes || !mainPrize?.name;
  const displayPrizeCount: string | number = data.prizeCount > 0 
    ? data.prizeCount 
    : "-";
  const isTitleLoading = !data.title || data.title.trim() === "";
  const isTimeLoading = !data.endDate || timeLeftLabel === "-";

  useEffect(() => {
    if (!data.endDate) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTimeLeftLabel("-");
      return;
    }

    setTimeLeftLabel(getTimeLeft(data.endDate));
    const timer = setInterval(() => {
      const nextValue = getTimeLeft(data.endDate);
      setTimeLeftLabel(nextValue);
      if (nextValue === "Sona erdi") clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [data.endDate]); 
  return (
    <div className="w-full h-full rounded-[40px] flex items-center justify-center p-8">
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}        
        className="rounded-2xl border border-(--border-default) flex flex-col z-1 bg-(--bg-neutral-primary) w-42.5 h-fit md:w-56  shadow-xs shadow-white/20 justify-between overflow-hidden"
      >
        
        {/* Ödül Görseli ve Sayısı */}
        <PreviewImageSection 
          constraint={data.constraint || ParticipationConstraint.EVERYONE} 
          prizeCount={displayPrizeCount} 
          isLoading={isImageLoading} 
          isConstraintLoading={!data.constraint}
          prizes={data.prizes} 
        />
        
        {/* Başlık ve Kalan Süre */}
        <PreviewCardInfo 
          title={data.title}
          amount={data.amount}
          isPrizeLoading={isImageLoading}
          isLoading={isTitleLoading} 
          timeLeft={timeLeftLabel}
          isTimeLoading={isTimeLoading} 
        />

        <PreviewStoreInfo />
      </motion.div>
    </div>
  );
}