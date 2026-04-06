"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RaffleFormData } from "@/features/raffles/raffle.types";
import { ParticipationConstraint } from "@/types/types";
import PreviewImageSection from "./PreviewImageSection";
import PreviewCardInfo from "./PreviewCardInfo";
import PreviewStoreInfo from "./PreviewStoreInfo";

// Kendi fonksiyonunu buraya dahil et veya dışarıdan import et
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

interface PreviewCardProps {
  data: RaffleFormData;
}

export default function PreviewCard({ data }: PreviewCardProps) {
  const [timeLeftLabel, setTimeLeftLabel] = useState("-");

  const isImageLoading = data.prizeCount <= 0;
  const isTitleLoading = !data.title.trim();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeLeftLabel(getTimeLeft(data.endDate));
    const timer = setInterval(() => {
      const nextValue = getTimeLeft(data.endDate);
      setTimeLeftLabel(nextValue);
      if (nextValue === "Sona erdi") {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [data.endDate]);

  return (
    <div className="w-full h-full rounded-[40px] flex items-center justify-center p-8">
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}        
        className="rounded-2xl border border-(--border-default) flex flex-col z-1 bg-(--bg-neutral-primary) w-42.5 h-95.5 md:w-56 md:h-117.5 shadow-xs shadow-white/20 justify-between overflow-hidden"
      >
        <PreviewImageSection 
          constraint={data.constraint || ParticipationConstraint.EVERYONE} 
          prizeCount={data.prizeCount}
          isLoading={isImageLoading}
        />
        
        <PreviewCardInfo 
          title={data.title}
          isLoading={isTitleLoading}
          timeLeft={timeLeftLabel} 
        />

        <PreviewStoreInfo />
      </motion.div>
    </div>
  );
}