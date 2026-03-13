import { ImageSection, CardInfo, StoreInfo } from "./CardSections";
import { Raffle } from "./types";
import { motion } from "framer-motion";

const LAYOUT_CLASSES = {
  horizontal:
    "bg-white w-[332px] h-[171px] md:h-53.75 md:w-103.25 justify-start",
  special:
    "gap-2 md:gap-4 bg-(--bg-neutral-primary) hover:bg-(--bg-neutral-primary-medium) w-42.5 h-95.5 md:w-56 md:h-117.5 flex-col shadow-xs shadow-white/20 justify-between",
  default:
    "gap-2 md:gap-4 bg-(--bg-neutral-primary) hover:bg-(--bg-neutral-primary-medium) w-45.25 h-93 flex-col shadow-xs shadow-white/20 p-2",
} as const;

interface RaffleCardProps {
  isLoading?: boolean;
  card: Raffle;
  type?: "special" | "default";
  orientation?: "horizontal" | "vertical";
  onCardClick?: (card: Raffle) => void;
}

export default function RaffleCard({
  isLoading = false,
  card,
  type = "special",
  orientation = "vertical",
  onCardClick,
}: RaffleCardProps) {
  const layoutClass = (() => {
    const hoverClass = isLoading
      ? ""
      : "hover:bg-(--bg-neutral-primary-medium)";

    if (orientation === "horizontal") return LAYOUT_CLASSES.horizontal;
    if (type === "special")
      return `gap-2 md:gap-4 bg-(--bg-neutral-primary) ${hoverClass} w-42.5 h-95.5 md:w-56 md:h-117.5 flex-col shadow-xs shadow-white/20 justify-between`;
    return `gap-2 md:gap-4 bg-(--bg-neutral-primary) ${hoverClass} w-45.25 h-93 flex-col shadow-xs shadow-white/20 p-2`;
  })();

  return (
    <motion.div
      onClick={() => !isLoading && onCardClick?.(card)}
      initial="initial"
      whileHover={isLoading ? undefined : "hover"}
      className={`rounded-2xl border border-(--border-default) flex cursor-pointer z-20 ${layoutClass} `}
    >
      <ImageSection
        card={card}
        orientation={orientation}
        type={type}
        isLoading={isLoading}
      />
      <CardInfo
        card={card}
        orientation={orientation}
        type={type}
        isLoading={isLoading}
      />
      {orientation === "vertical" && type === "special" && (
        <StoreInfo card={card} isLoading={isLoading} />
      )}
    </motion.div>
  );
}
