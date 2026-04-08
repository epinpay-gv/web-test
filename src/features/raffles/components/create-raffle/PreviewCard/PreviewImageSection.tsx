"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ParticipationConstraint } from "@/types/types";
import { CONSTRAINT_BACKGROUNDS, CONSTRAINT_LABELS, SHIMMER_CLASS } from "./preview.utils";
import { RafflePrize } from "@/features/raffles/raffle.types";
import { cn } from "@/lib/utils";

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
  isLoading, // Resimlerin yüklenme durumu
  isConstraintLoading, // Kısıtlamanın yüklenme durumu
  prizes = []
}: PreviewImageSectionProps) {
  const currentBg = CONSTRAINT_BACKGROUNDS[constraint] || CONSTRAINT_BACKGROUNDS[ParticipationConstraint.EVERYONE];
  const rawConstraint = constraint || ParticipationConstraint.EVERYONE;
  const currentBadgeLabel = CONSTRAINT_LABELS[rawConstraint as ParticipationConstraint] 
    || (typeof rawConstraint === 'string' ? rawConstraint : "Herkes");
  
  const isEveryone = currentBadgeLabel === "Herkes" || 
                     currentBadgeLabel === "Herkes Katılabilir" || 
                     rawConstraint === ParticipationConstraint.EVERYONE;

  const visiblePrizes = prizes.length > 0 
    ? (prizes.length > 1 ? prizes.slice(0, 3) : [prizes[0], prizes[0], prizes[0]])
    : [];

  const isMulti = prizes.length > 1;

  return (
    <div className={cn(
      "shrink-0 min-h-40 md:min-h-53.75 w-full rounded-t-2xl relative overflow-hidden flex items-center justify-center group",
      !isEveryone ? "p-14 pb-4" : "p-14"
      )}>
      
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
          
      <div className="relative z-10 flex flex-col items-center justify-center gap-2 w-full">            
        <div className="flex flex-col items-center">
          <div className="w-25 h-25 md:w-33.75 md:h-33.75 relative">
            {isLoading || prizes.length === 0 ? (
              <div className={`absolute inset-0 border border-neutral-700 rounded-2xl ${SHIMMER_CLASS}`} />
            ) : (
              visiblePrizes.map((prize, index) => {
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
                      unoptimized
                      sizes="(max-width: 768px) 100px, 135px"
                      className="rounded-2xl border border-white/10 object-contain p-0.5 bg-neutral-900/60 shadow-2xl"
                    />
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
    
        {!isEveryone && (
          <motion.div
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mt-2"
          >
            {isConstraintLoading ? (
               <div className={`w-full h-5 ${SHIMMER_CLASS} opacity-50 rounded-sm`} />
            ) : (
              <span
                style={{ backgroundColor: 'rgba(163, 163, 163, 0.2)'}}                
                className="relative text-neutral-700 rounded-sm border border-white/10 py-0.5 px-1 text-xs  backdrop-blur-md shadow-sm inline-block"
              >
                {currentBadgeLabel}
              </span>
            )}
          </motion.div>
        )}
      </div>
    
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[url('/raffles-page/quantity-badge.webp')] bg-cover bg-center z-50 absolute w-11 h-11 md:w-13 md:h-13 flex items-center justify-center top-4 right-6 shadow-xl text-white"
      >          
        {prizes.length < 1 ? (
          <div className="h-2 w-full rounded-full mx-3 bg-neutral-800" />        
        ) : (
          <p className="font-extrabold text-xl text-cyan-400 drop-shadow-md">
            {`X${prizeCount}`}
          </p>
        )}
      </motion.div>
    </div>
  );
}