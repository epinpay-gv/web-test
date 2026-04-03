// PreviewCard/index.tsx
"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { RaffleFormData } from "@/features/raffles/raffle.types";
import { ParticipationConstraint } from "@/types/types";
import PreviewImageSection from "./PreviewImageSection";
import PreviewCardInfo from "./PreviewCardInfo";
import PreviewStoreInfo from "./PreviewStoreInfo";

interface PreviewCardProps {
  data: RaffleFormData;
}

export default function PreviewCard({ data }: PreviewCardProps) {
  const isImageLoading = data.prizeCount <= 0;
  const isTitleLoading = !data.title.trim();
  const timeLeft = useMemo(() => {
    return "1 gün kaldı"; 
  }, []);

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
          timeLeft={timeLeft}
        />

        <PreviewStoreInfo />
      </motion.div>
    </div>
  );
}