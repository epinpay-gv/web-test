"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ParticipationConstraint, Raffle, CreatorType } from "@/types/types";

const BADGE_TEXT: Record<ParticipationConstraint, string> = {
  EVERYONE: "",
  PREMIUM: "Premium üyelere özel",
  REFERENCE: "Referanslı üyelere özel",
  FOLLOWER: "",
  ROLE: "",
};

const SPRING = {
  type: "spring" as const,
  mass: 1,
  stiffness: 400,
  damping: 30,
};

const IMAGE_VARIANTS_SINGLE_CATEGORY = [
  //Center image
  {
    initial: { x: 0, y: -5, rotate: 0, scale: 1 },
    hover: { x: 0, y: -5, rotate: 0, scale: 1 },
    zIndex: 3,
  },
  // Right image
  {
    initial: { x: 0, y: -5, rotate: 0, scale: 1 },
    hover: { x: 10, y: -15, rotate: 10, scale: 1 },
    zIndex: 2,
  },
  // Left image
  {
    initial: { x: 0, y: -5, rotate: 0, scale: 1 },
    hover: { x: -10, y: 0, rotate: -10, scale: 1 },
    zIndex: 1,
  },
] as const;

const IMAGE_VARIANTS_MULTI_CATEGORY = [
  //Center image
  {
    initial: { x: 0, y: -5, rotate: 0, scale: 1 },
    hover: { x: 0, y: -5, rotate: 0, scale: 1 },
    zIndex: 3,
  },
  // Right image
  {
    initial: { x: 10, y: -15, rotate: 10, scale: 1 },
    hover: { x: 25, y: -20, rotate: 20, scale: 1 },
    zIndex: 2,
  },
  // Left image
  {
    initial: { x: -10, y: -15, rotate: -10, scale: 1 },
    hover: { x: -25, y: -20, rotate: -20, scale: 1 },
    zIndex: 1,
  },
] as const;

const LAYOUT_CLASSES = {
  horizontal: "w-[160px] md:w-53.75 h-full rounded-l-2xl",
  special: "shrink-0 min-h-40 md:min-h-[215px] w-full rounded-t-2xl",
  default: "shrink-0 min-h-40 md:min-h-[153px] w-full rounded-t-2xl",
} as const;

const IMAGE_STACK_CLASSES = {
  default: "relative w-25 h-25",
  special: "relative w-25 h-25 md:w-[135px] md:h-[135px]",
} as const;

interface ImageSectionProps {
  card: Raffle;
  isLoading?: boolean;
  type?: "special" | "default";
  orientation?: "horizontal" | "vertical";
}

export default function ImageSection({
  isLoading = false,
  card,
  type = "special",
  orientation = "vertical",
}: ImageSectionProps) {
  const rewards = card.rewards ?? [];  
  const visibleRewards =
    card.categoryCount > 1
      ? rewards.slice(0, 3)
      : [rewards[0], rewards[0], rewards[0]];

  const isMulti = card.categoryCount > 1 && visibleRewards.length > 1;

  const bgImage = (() => {
    if (orientation !== "vertical" || type !== "special") return null;
    
    if (card.creatorType === CreatorType.PLATFORM) {
      return "/raffles-page/type-blue.webp";
    }
    
    if (card.constraint === ParticipationConstraint.PREMIUM) {
      return "/raffles-page/type-gold.webp";
    }
    
    if (card.constraint === ParticipationConstraint.REFERENCE) {
      return "/raffles-page/type-gray.webp";
    }

    // Default for other types if special
    return "/raffles-page/type-blue.webp";
  })();

  // Main div layout class
  const layoutClass = (() => {
    if (orientation === "horizontal") return LAYOUT_CLASSES.horizontal;
    if (type === "special") return LAYOUT_CLASSES.special;
    return LAYOUT_CLASSES.default;
  })();

  if (isLoading) {
    return (
      <div
        className={`flex items-center justify-center relative shrink-0  ${layoutClass}`}
      >
        <div className="w-full h-full shimmer bg-gray-200 rounded-t-2xl" />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center relative shrink-0 ${layoutClass}`}
      style={bgImage ? { 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      } : {}}
    >
      {/* Image stack container */}
      <div className={IMAGE_STACK_CLASSES[type]}>
        {visibleRewards.map((reward, index) => {
          const variant = isMulti
            ? IMAGE_VARIANTS_MULTI_CATEGORY[index]
            : IMAGE_VARIANTS_SINGLE_CATEGORY[index];

          return (
            <motion.div
              key={index}
              variants={{
                initial: variant.initial,
                hover: variant.hover,
              }}
              transition={SPRING}
              style={{ zIndex: variant.zIndex }}
              className="absolute inset-0"
            >
              <Image
                src={reward.image ?? ""}
                alt={reward.name}
                width={type === "default" ? 100 : 135}
                height={type === "default" ? 100 : 135}
                className={`rounded-2xl border border-(--border-default) 
                  ${type === "special" ? "border-(--border-default)" : "border-white"}`}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Quantity badge */}
      <div
        className={`bg-[url('/raffles-page/quantity-badge.webp')] bg-cover bg-center z-50 absolute w-11 h-11 md:w-13 md:h-13 flex items-center justify-center 
          ${type === "default" ? "top-2 right-4" : "top-4 right-6"}`}
      >
        <p className="text-extrabold leading-[150%] text-(--text-fg-info)">
          x{card.productCount ?? 0}
        </p>
      </div>

      {/* Participant Badge - Only for PREMIUM or REFERENCE */}
      {type === "special" && 
       orientation === "vertical" && 
       (card.constraint === ParticipationConstraint.PREMIUM || card.constraint === ParticipationConstraint.REFERENCE) && (
        <div
          className="absolute rounded-sm py-0.5 px-2 text-[10px] font-bold bottom-2 tracking-wide uppercase"
          style={{
            backgroundColor: card.constraint === ParticipationConstraint.PREMIUM 
              ? 'var(--bg-warning-soft)' 
              : 'var(--bg-neutral-tertiary-medium)',
            border: `1px solid ${card.constraint === ParticipationConstraint.PREMIUM 
              ? 'var(--border-warning-subtle)' 
              : 'var(--border-default)'}`,
            color: card.constraint === ParticipationConstraint.PREMIUM 
              ? 'var(--text-fg-yellow)' 
              : 'var(--text-body)'
          }}
        >
          {BADGE_TEXT[card.constraint]}
        </div>
      )}
    </div>
  );
}

