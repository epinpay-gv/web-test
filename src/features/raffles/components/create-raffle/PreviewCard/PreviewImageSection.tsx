
"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ParticipationConstraint } from "@/types/types";
import { CONSTRAINT_BACKGROUNDS, CONSTRAINT_LABELS, SHIMMER_CLASS } from "./preview.utils";
import { Badge } from "@/components/common";

interface PreviewImageSectionProps {
  constraint: ParticipationConstraint;
  prizeCount: number;
  isLoading: boolean;
}

export default function PreviewImageSection({
  constraint,
  prizeCount,
  isLoading,
}: PreviewImageSectionProps) {
  const currentBg = CONSTRAINT_BACKGROUNDS[constraint] || CONSTRAINT_BACKGROUNDS[ParticipationConstraint.EVERYONE];
  const currentBadgeLabel = CONSTRAINT_LABELS[constraint] || "Herkes";

  return (
    <div className="shrink-0 min-h-40 md:min-h-53.75 w-full p-10 pb-6 rounded-t-2xl relative overflow-hidden flex items-center justify-center">
    
      <AnimatePresence mode="popLayout">
        <motion.div
          key={constraint} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`absolute inset-0 ${currentBg}`}
        />
      </AnimatePresence>

      {/* İÇERİK */}
      <div className="relativ z-10 flex flex-col items-center justify-center gap-2">
        {isLoading ? (
          <div className="w-25 h-25 md:w-33.75 md:h-33.75 relative">
            <div className={`absolute inset-0 border border-neutral-700 rounded-2xl ${SHIMMER_CLASS}`} />
          </div>
        ) : (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
          >
             {/* Ödül Görseli */}
            <div className="w-25 h-25 md:w-33.75 md:h-33.75 relative">
              <Image
                src="/images/reward-placeholder.webp"
                alt="Reward"
                fill
                className="rounded-2xl border border-(--border-default) object-contain p-2 bg-neutral-900/40"
              />
            </div>          
            <motion.div
              key={constraint + "-badge"} 
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-2"
            >
              <motion.span
                key={currentBadgeLabel}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  backgroundColor: 'rgba(163, 163, 163, 0.5)',
                  color: "#404040",
                }}                
                className="relative z-20 mt-2 rounded-sm border border-white/20 py-0.5 px-3 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm"
              >
                {currentBadgeLabel}
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </div>

      {!isLoading && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[url('/raffles-page/quantity-badge.webp')] bg-cover bg-center z-20 absolute w-11 h-11 md:w-13 md:h-13 flex items-center justify-center top-4 right-6 shadow-xl text-white"
        >
          <p className="font-extrabold text-lg">x{prizeCount || 1}</p>
        </motion.div>
      )}
    </div>
  );
}