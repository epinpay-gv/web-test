"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ParticipationConstraint } from "@/types/types";
import { CONSTRAINT_BACKGROUNDS, CONSTRAINT_LABELS, SHIMMER_CLASS } from "./preview.utils";
import { RafflePrize } from "@/features/raffles/raffle.types";

const SPRING = { 
  type: "spring" as const, 
  mass: 1, 
  stiffness: 400, 
  damping: 30 
};

const IMAGE_VARIANTS = [
  { initial: { x: 0, y: -5, rotate: 0 }, hover: { x: 0, y: -5, rotate: 0 }, zIndex: 3 }, // Orta
  { initial: { x: 15, y: -10, rotate: 12 }, hover: { x: 25, y: -15, rotate: 20 }, zIndex: 2 }, // Sağ
  { initial: { x: -15, y: -10, rotate: -12 }, hover: { x: -25, y: -15, rotate: -20 }, zIndex: 1 }, // Sol
];

interface PreviewImageSectionProps {
  constraint: ParticipationConstraint;
  prizeCount: number | string;
  isLoading: boolean;
  isConstraintLoading?: boolean;
  prizes: RafflePrize[];
}

export default function PreviewImageSection({
  constraint,
  prizeCount,
  isLoading,
  isConstraintLoading,
  prizes = []
}: PreviewImageSectionProps) {
  const currentBg = CONSTRAINT_BACKGROUNDS[constraint] || CONSTRAINT_BACKGROUNDS[ParticipationConstraint.EVERYONE];
  const currentBadgeLabel = CONSTRAINT_LABELS[constraint] || "Herkes";  
  const visiblePrizes = prizes.length > 0 
    ? (prizes.length > 1 ? prizes.slice(0, 3) : [prizes[0], prizes[0], prizes[0]])
    : [];

  const isMulti = prizes.length > 1;

  return (
    <div className="shrink-0 min-h-40 md:min-h-53.75 w-full p-14 pb-6 rounded-t-2xl relative overflow-hidden flex items-center justify-center group">
      
      <AnimatePresence mode="popLayout">
        <motion.div
          key={constraint} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 ${currentBg}`}
        />
      </AnimatePresence>
          
      <div className="relative z-10 flex flex-col items-center justify-center gap-2">
        {isLoading || prizes.length === 0 ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-25 h-25 md:w-33.75 md:h-33.75 relative">
              <div className={`absolute inset-0 border border-neutral-700 rounded-2xl ${SHIMMER_CLASS}`} />
            </div>
            <div className={`w-24 h-5 ${SHIMMER_CLASS} opacity-50 rounded-sm mt-2`} />
          </div>
        ) : (
          <div className="flex flex-col items-center">          
            <div className="w-25 h-25 md:w-33.75 md:h-33.75 relative">
              {visiblePrizes.map((prize, index) => {
                const variant = IMAGE_VARIANTS[index];
                return (
                  <motion.div
                    key={`${prize.id}-${index}`}
                    initial={isMulti ? variant.initial : { x: 0, y: 0, rotate: 0 }}
                    whileHover={isMulti ? variant.hover : {}}
                    transition={SPRING}
                    style={{ zIndex: variant.zIndex }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={prize.image || ""}
                      alt={prize.name || "Reward"}
                      fill
                      sizes="(max-width: 768px) 100px, 135px"
                      className="rounded-2xl border border-white/10 object-contain p-0.5 bg-neutral-900/60 shadow-2xl"
                    />
                  </motion.div>
                );
              })}
            </div>                     
            
            <motion.div
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-4"
            >
              <span
                style={{ backgroundColor: 'rgba(163, 163, 163, 0.2)', color: "#ffffff" }}                
                className="relative z-20 rounded-sm border border-white/10 py-0.5 px-3 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm inline-block"
              >
                {isConstraintLoading ? "Yükleniyor..." : currentBadgeLabel}
              </span>
            </motion.div>
          </div>
        )}
      </div>

      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[url('/raffles-page/quantity-badge.webp')] bg-cover bg-center z-50 absolute w-11 h-11 md:w-13 md:h-13 flex items-center justify-center top-4 right-6 shadow-xl text-white"
      >          
        <p className="font-extrabold text-xl text-(--text-fg-info) drop-shadow-md">
          {prizeCount && prizeCount !== "-" ? `X${prizeCount}` : "0"}
        </p>
      </motion.div>
    </div>
  );
}