import { ImageSection, CardInfo, StoreInfo } from "./CardSections";
import { Raffle } from "./types";
import { motion } from "framer-motion";

const LAYOUT_CLASSES = {
  horizontal: "bg-white w-[332px] h-[171px] md:h-53.75 md:w-103.25 justify-start",
  special:
    "bg-(--bg-neutral-primary) hover:bg-(--bg-neutral-primary-medium) w-42.5 h-95.5 md:w-56 md:h-117.5 flex-col shadow-xs shadow-white/20 justify-between",
  default:
    "bg-(--bg-neutral-primary) hover:bg-(--bg-neutral-primary-medium) w-45.25 h-93 flex-col shadow-xs shadow-white/20 p-2",
} as const;

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
  const layoutClass = (() => {
    if (orientation === "horizontal") return LAYOUT_CLASSES.horizontal;
    if (type === "special") return LAYOUT_CLASSES.special;
    return LAYOUT_CLASSES.default;
  })();

  return (
    <motion.div
      onClick={() => onCardClick?.(card)}
      initial="initial"
      whileHover="hover"
      className={`rounded-2xl border border-(--border-default) flex gap-2 md:gap-4 cursor-pointer z-20 ${layoutClass} `}>
      <ImageSection card={card} orientation={orientation} type={type} />
      <CardInfo card={card} orientation={orientation} type={type} />
      {orientation === "vertical" && type === "special" && (
        <StoreInfo card={card} />
      )}
    </motion.div>
  );
}
