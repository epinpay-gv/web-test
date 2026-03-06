import Image from "next/image";
import { ParticipationConstraint, CreatorType, Raffle } from "../types";
import { motion } from "framer-motion";

const BACKGROUND_CLASSES: Record<ParticipationConstraint, string> = {
  EVERYONE: "",
  PREMIUM: "bg-[url('/raffles-page/type-gold.webp')] bg-cover bg-center",
  REFERENCE: "bg-[url('/raffles-page/type-gray.webp')] bg-cover bg-center",
  FOLLOWER: "",
  ROLE: "",
};

interface ImageSectionProps {
  card: Raffle;
}

export default function ImageSection({ card }: ImageSectionProps) {
  return (
    <div
      className={`
        ${
          card.constraint === ParticipationConstraint.PREMIUM ||
          ParticipationConstraint.REFERENCE
            ? BACKGROUND_CLASSES[card.constraint]
            : ""
        } 
      ${card.creatorType === CreatorType.PLATFORM ? "bg-[url('/raffles-page/type-blue.webp')] bg-cover bg-center" : ""}}
        h-53.75 rounded-t-2xl flex items-center justify-center relative`}
    >
      {card.rewards &&
        card.rewards.map((i) => (
          <Image
            key={i.id}
            src={i.image ?? ""}
            alt={""}
            width={135}
            height={135}
            className="rounded-2xl border border-(--border-default)"
          />
        ))}

      <div className="bg-[url('/raffles-page/quantity-badge.webp')] bg-cover bg-center z-50 absolute top-4 right-6 w-13 h-13 flex items-center justify-center">
        <p className="text-extrabold leading-[150%] text-(--text-fg-info)">
          x{card.productCount ?? 0}
        </p>
      </div>
    </div>
  );
}
