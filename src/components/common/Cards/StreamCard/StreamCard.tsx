import { Stream } from "@/features/streamers/streamers.types";
import Image from "next/image";
import StreamerInfo from "./CardSections/StreamerInfo";

type CardVariant = "default" | "detailed";
type CardSize = "base" | "lg";

const CARD_VARIANT_CLASSES: Record<CardVariant, string> = {
  default: "border-8 border-white/40",
  detailed: "",
};
const CARD_SIZE_CLASSES: Record<CardSize, string> = {
  base: "w-[320px] h-45",
  lg: "w-165 h-84.5",
};

interface StreamCardProps {
  variant?: CardVariant;
  size?: CardSize;
  data: Stream;
  onClick: () => void;
}

export default function StreamCard({
  variant = "default",
  size = "base",
  data,
  onClick,
}: StreamCardProps) {
  if (!data) {
    return (
      <div
        className={`animate-fade-in aspect-video rounded-2xl overflow-y-hidden shadow-md
      ${CARD_SIZE_CLASSES[size]} ${CARD_VARIANT_CLASSES[variant]}`}
      >
        <span className="text-white/30 text-sm">Yükleniyor...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`animate-fade-in aspect-video rounded-2xl overflow-y-hidden shadow-md
      ${CARD_SIZE_CLASSES[size]} ${CARD_VARIANT_CLASSES[variant]}`}
      >
        <iframe
          src={data.streamURl}
          width="660"
          height="338"
          className="w-full h-full block"
          allowFullScreen
          allow="autoplay; fullscreen"
          title={data.full_name}
        />
      </div>
      {variant === "detailed" && <StreamerInfo data={data} />}
    </div>
  );
}
