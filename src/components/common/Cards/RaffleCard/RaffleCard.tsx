import { ImageSection, CardInfo, StoreInfo } from "./CardSections";
import { Raffle } from "./types";
import { motion } from "framer-motion";

interface RaffleCardProps {
  card: Raffle;
  type?: "special" | "default";
  orientation?: "horizontal" | "vertical";
  onCardClick?: (card: Raffle) => void;
}

export default function RaffleCard({
  card,
  type = "special",
  orientation = "vertical",
  onCardClick,
}: RaffleCardProps) {
  return (
    <motion.div
      onClick={() => onCardClick?.(card)}
      initial="initial"
      whileHover="hover"
      className={`rounded-2xl border border-(--border-default) flex gap-2 md:gap-4 cursor-pointer
        ${
          orientation === "horizontal"
            ? "bg-white h-53.75 w-103.25  justify-between"
            : type === "default"
              ? "bg-(--bg-neutral-primary) hover:bg-(--bg-neutral-primary-medium) w-45.25 h-93 flex-col shadow-xs shadow-white/20 p-2"
              : "bg-(--bg-neutral-primary) hover:bg-(--bg-neutral-primary-medium) w-42.5 h-95.5 md:w-56 md:h-117.5 flex-col shadow-xs shadow-white/20 justify-between"
        } 
        `}
    >
      <ImageSection card={card} orientation={orientation} type={type} />
      <CardInfo
        card={card}
        orientation={orientation}
        type={type}
      />
      {orientation === "vertical" && type === "special" && (
        <StoreInfo card={card} />
      )}
    </motion.div>
  );
}
