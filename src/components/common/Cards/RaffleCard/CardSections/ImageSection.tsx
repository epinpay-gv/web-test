"use client";
import Image from "next/image";
import { ParticipationConstraint, CreatorType, Raffle } from "../types";
import { motion } from "framer-motion";

const BADGE_TEXT: Record<ParticipationConstraint, string> = {
  EVERYONE: "Epinpay çekilişi",
  PREMIUM: "Premium üyelere özel",
  REFERENCE: "Referanslı üyelere özel",
  FOLLOWER: "",
  ROLE: "",
};

const BACKGROUND_CLASSES: Record<ParticipationConstraint, string> = {
  EVERYONE: "",
  PREMIUM: "bg-[url('/raffles-page/type-gold.webp')] bg-cover bg-center",
  REFERENCE: "bg-[url('/raffles-page/type-gray.webp')] bg-cover bg-center",
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
    initial: { x: 0, y: 0, rotate: 0, scale: 1 },
    hover: { x: 0, y: 0, rotate: 0, scale: 1 },
    zIndex: 3,
  },
  // Right image
  {
    initial: { x: 2, y: 0, rotate: 0, scale: 1 },
    hover: { x: 10, y: -10, rotate: 10, scale: 1 },
    zIndex: 2,
  },
  // Left image
  {
    initial: { x: 0, y: 0, rotate: 0, scale: 1 },
    hover: { x: -10, y: 5, rotate: -10, scale: 1 },
    zIndex: 1,
  },
] as const;

const IMAGE_VARIANTS_MULTI_CATEGORY = [
  //Center image
  {
    initial: { x: 0, y: 0, rotate: 0, scale: 1 },
    hover: { x: 0, y: 0, rotate: 0, scale: 1 },
    zIndex: 3,
  },
  // Right image
  {
    initial: { x: 10, y: -10, rotate: 10, scale: 1 },
    hover: { x: 25, y: -15, rotate: 20, scale: 1 },
    zIndex: 2,
  },
  // Left image
  {
    initial: { x: -10, y: -10, rotate: -10, scale: 1 },
    hover: { x: -25, y: -15, rotate: -20, scale: 1 },
    zIndex: 1,
  },
] as const;

interface ImageSectionProps {
  card: Raffle;
  type?: "special" | "default";
  orientation?: "horizontal" | "vertical";
}

export default function ImageSection({
  card,
  type = "special",
  orientation = "vertical",
}: ImageSectionProps) {
  const rewards = card.rewards ?? [];

  // If categoryCount > 1, multi-reward fan in first state else 1 image only
  const visibleRewards =
    card.categoryCount > 1
      ? rewards.slice(0, 3)
      : [rewards[0], rewards[0], rewards[0]];

  const isMulti = card.categoryCount > 1 && visibleRewards.length > 1;

  return (
    <div
      className={`
        ${
          orientation === "vertical" &&
          type === "special" &&
          (card.creatorType === CreatorType.PLATFORM
            ? "bg-[url('/raffles-page/type-blue.webp')] bg-cover bg-center"
            : card.constraint === ParticipationConstraint.PREMIUM ||
                card.constraint === ParticipationConstraint.REFERENCE
              ? BACKGROUND_CLASSES[card.constraint]
              : "")
        }
        flex items-center justify-center relative shrink-0
        ${
          orientation === "horizontal"
            ? "w-53.75 h-full rounded-l-2xl"
            : type === "special"
              ? "h-53.75 w-full rounded-t-2xl"
              : "h-38.25 w-full rounded-t-2xl"
        }
      `}
    >
      {/* Image stack container */}
      <div
        className={`relative ${type === "default" ? "w-25 h-25" : "w-33.75 h-33.75"}`}
      >
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
        className={`bg-[url('/raffles-page/quantity-badge.webp')] bg-cover bg-center z-50 absolute  w-13 h-13 flex items-center justify-center 
          ${type === "default" ? "top-2 right-4" : "top-4 right-6"}`}
      >
        <p className="text-extrabold leading-[150%] text-(--text-fg-info)">
          x{card.productCount ?? 0}
        </p>
      </div>

      {/* Special Badge */}
      {type === "special" && (
        <div
          className={`absolute rounded-sm py-0 5 px-2 text-sm bg-neutral-700/50 bottom-2 text-neutral-700 font-base
        `}
        >
          {card.creatorType === CreatorType.PLATFORM
            ? BADGE_TEXT[ParticipationConstraint.EVERYONE]
            : BADGE_TEXT[card.constraint]}
        </div>
      )}
    </div>
  );
}
