import { Button } from "@/components/common";
import { BannerSectionData } from "@/features/raffles/raffle.types";
import Image from "next/image";

interface StreamerBannerLeftProps {
  data: BannerSectionData[];
  selectedId: string;
  onSelect: (id: string) => void;
}
export default function StreamerBannerLeft({
  data,
  selectedId,
  onSelect,
}: StreamerBannerLeftProps) {
  return (
    <div className="flex flex-col gap-10 max-w-128.5">
      {/* TITLE */}
      <div className="flex flex-col gap-4">
        <p className="text-3xl font-semibold text-(--text-heading)">Capcanlı</p>
        <h2 className="text-4xl font-semibold text-(--text-fg-info)">
          Yayıncı Çekilişleri
        </h2>
        <Button text="Yayıncı ol" variant="brand" />
      </div>

      {/* YAYINCILAR */}
      <div className="flex flex-wrap justify-between gap-8.5">
        {data.map((i) => (
          <button
            key={i.id}
            className="cursor-pointer"
            onClick={() => onSelect(i.id)}
          >
            <Image
              src={i.image}
              alt={i.name}
              width={64}
              height={64}
              className={`rounded-full ${selectedId === i.id ? "border-2 border-white shadow-lg w-24.5 h-24.5" : ""} `}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
