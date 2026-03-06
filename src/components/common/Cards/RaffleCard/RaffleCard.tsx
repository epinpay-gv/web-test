"use client";
import { ImageSection, CardInfo, StoreInfo } from "./CardSections";
import { Raffle } from "./types";
import { motion } from "framer-motion";

interface RaffleCardProps {
  card: Raffle;
}

export default function RaffleCard({ card }: RaffleCardProps) {
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="w-56 h-117.5 rounded-2xl border border-(--border-default) bg-(--bg-neutral-primary) flex flex-col justify-between gap-4"
    >
      <ImageSection card={card} />
      <CardInfo card={card} />
      <StoreInfo card={card} />
    </motion.div>
  );
}
