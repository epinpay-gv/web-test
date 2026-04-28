import { CreatorType, Raffle } from "@/types/types";
import Image from "next/image";

const CreatorTypeMap: Record<CreatorType, string> = {
  STORE: "Mağaza",
  PUBLISHER: "Yayıncı",
  PLATFORM: "Mağaza",
};
interface StoreInfoProps {
  card: Raffle;
  isLoading?: boolean;
}

export default function StoreInfo({ card, isLoading = false }: StoreInfoProps) {
  //SKELETON
  if (isLoading) {
    return (
      <div className="flex items-center pt-2 pb-4 px-4 gap-1.5 border-t">
        {/* AVATAR */}
        <div className="w-6 h-6 rounded-full shimmer bg-gray-200 shrink-0" />

        {/* INFO */}
        <div className="flex flex-col gap-1">
          <div className="w-20 h-3 shimmer bg-gray-200 rounded-full" />
          <div className="w-12 h-3 shimmer bg-gray-200 rounded-full" />
        </div>
      </div>
    );
  }

  const creatorName = card.creator?.name || "Admin";
  const creatorImage = card.creator?.image || "/common/avatar-placeholder.png";

  return (
    <div className="flex items-center pt-2 pb-4 px-4 gap-1.5 border-t">
      {/* AVATAR */}
      <Image
        src={creatorImage}
        alt={creatorName}
        width={24}
        height={24}
        priority
        className="rounded-full w-6 h-6 object-cover"
      />

      {/* INFO */}

      <div className="flex flex-col text-xs">
        <p className="text-(--text-heading)">{creatorName}</p>
        <p className="text-(--text-body)">{card.creatorType ? CreatorTypeMap[card.creatorType] : "Mağaza"}</p>
      </div>
    </div>
  );
}
