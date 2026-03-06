"use client";
import { ImageSection, CardInfo, StoreInfo } from "./CardSections";
import { Raffle } from "./types";
import { motion } from "framer-motion";

interface RaffleCardProps {
  card: Raffle;
  orientation?: "horizontal" | "vertical";
}

export default function RaffleCard({ card, orientation = "vertical" }: RaffleCardProps) {
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className={`rounded-2xl border border-(--border-default) flex justify-between gap-4
        ${orientation === "horizontal" ? 
        "bg-white h-53.75 w-103.25" 
        : "bg-(--bg-neutral-primary) hover:bg-(--bg-neutral-primary-medium) w-56 h-117.5 flex-col shadow-xs shadow-white/20"} 
        `}
    >
      <ImageSection card={card} orientation={orientation}/>
      <CardInfo card={card} orientation={orientation}/>
      {orientation === "vertical" && <StoreInfo card={card} />}
    </motion.div>
  );
}
