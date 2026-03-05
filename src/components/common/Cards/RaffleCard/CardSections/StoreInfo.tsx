import Image from "next/image";
import { Raffle } from "../types";
interface StoreInfoProps {
  card: Raffle;
}

export default function StoreInfo({ card }: StoreInfoProps) {
  return (
    <div className="flex items-center pt-2 pb-4 px-4 gap-1.5 border-t">
      {/* AVATAR */}
      <Image
        src={card.creator.image}
        alt={card.creator.name}
        width={24}
        height={24}
        priority
        className="rounded-full w-6 h-6"
      />

      {/* INFO */}

      <div className="flex flex-col text-xs">
        <p className="text-(--text-heading)">{card.creator.name}</p>
        <p className="text-(--text-body)">{card.creatorType}</p>
      </div>
    </div>
  );
}
