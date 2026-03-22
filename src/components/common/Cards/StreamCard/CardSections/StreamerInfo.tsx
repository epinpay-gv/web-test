import {
  StreamerLeague,
  BasicStreamer,
} from "@/features/streamers/streamers.types";
import Image from "next/image";

type CardVariant = "default" | "detailed";
type CardSize = "base" | "lg";

const CARD_VARIANT_CLASSES: Record<CardVariant, string> = {
  default: "gap-2.5",
  detailed: "flex-col gap-8",
};
const CARD_SIZE_CLASSES: Record<CardSize, string> = {
  base: "w-[44px] h-[44px]",
  lg: "w-[120px] h-[120px]",
};
const BADGE_SIZE_CLASSES: Record<CardSize, string> = {
  base: "w-8 h-8",
  lg: "w-[68px] h-[68px]",
};

const LEAGUE_IMAGE_SRC: Record<StreamerLeague, string> = {
  rookie: "/streamers/level-0.webp",
  bronze: "/streamers/level-1.webp",
  silver: "/streamers/level-2.webp",
  gold: "/streamers/level-3.webp",
  platinum: "/streamers/level-4.webp",
};

interface StreamerInfoProps {
  data: BasicStreamer;
  variant?: CardVariant;
  size?: CardSize;
}

export default function StreamerInfo({
  data,
  variant = "default",
  size = "base",
}: StreamerInfoProps) {
  return (
    <div className={`z-20 flex items-center ${CARD_VARIANT_CLASSES[variant]}`}>
      <div className="relative">
        <div
          className={`relative rounded-full overflow-hidden ${CARD_SIZE_CLASSES[size]}`}
        >
          <Image
            src={data.avatar_url}
            alt={data.full_name}
            fill
            className="object-cover"
          />
        </div>
        {data.isEpinpayStreamer && data.package && (
          <div
            className={`absolute -right-2 -bottom-2 rounded-full overflow-hidden border-2 border-(--border-light-medium) ${BADGE_SIZE_CLASSES[size]}`}
          >
            <Image
              src={LEAGUE_IMAGE_SRC[data.package]}
              alt={data.full_name}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 text-white">
        <p className="text-xl leading-2">{data.full_name}</p>
        {variant === "detailed" ? <p className="text-lg leading-2 text-(--text-body)">{data.followerCount} takipçi</p> : <p className="text-lg leading-2 text-(--text-body)">{data.nick_name}</p>}
      </div>
    </div>
  );
}
