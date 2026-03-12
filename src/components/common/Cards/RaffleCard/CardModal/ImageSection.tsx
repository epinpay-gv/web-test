import { ParticipationConstraint, CreatorType, Raffle } from "../types";
import Image from "next/image";


const BACKGROUND_CLASSES: Record<ParticipationConstraint, string> = {
  EVERYONE: "",
  PREMIUM: "bg-[url('/raffles-page/type-gold.webp')] bg-cover bg-center",
  REFERENCE: "bg-[url('/raffles-page/type-gray.webp')] bg-cover bg-center",
  FOLLOWER: "",
  ROLE: "",
};

interface ImageSectionProps {
  data: Raffle;
}

export default function ImageSection({ data }: ImageSectionProps) {
  const reward = data?.rewards?.[0];
  
  return (
    <div
      className={`
            ${
              data.creatorType === CreatorType.PLATFORM
                ? "bg-[url('/raffles-page/type-blue.webp')] bg-cover bg-center"
                : data.constraint === ParticipationConstraint.PREMIUM ||
                    data.constraint === ParticipationConstraint.REFERENCE
                  ? BACKGROUND_CLASSES[data.constraint]
                  : ""
            }
            flex items-center justify-center relative shrink-0 
            w-40 h-40 md:w-53.75 md:h-53.75 rounded-2xl
    
          `}
    >
      <div className="w-25 h-25 md:w-33.75 md:h-33.75">
        <Image
          src={reward?.image ?? ""}
          alt={reward?.name ?? ""}
          width={135}
          height={135}
          className="rounded-2xl border border-(--border-default)"
        />
      </div>
      {/* Quantity badge */}
      <div
        className={`bg-[url('/raffles-page/quantity-badge.webp')] bg-cover bg-center z-50 absolute  w-13 h-13 flex items-center justify-center 
              ${"top-4 right-6"}`}
      >
        <p className="text-extrabold leading-[150%] text-(--text-fg-info)">
          x{data.productCount ?? 0}
        </p>
      </div>
    </div>
  );
}
