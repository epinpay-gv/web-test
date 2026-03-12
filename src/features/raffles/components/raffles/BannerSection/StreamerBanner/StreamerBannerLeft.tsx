"use client"
import { Button } from "@/components/common";
import { BannerSectionData } from "@/features/raffles/raffle.types";
import Image from "next/image";
import { useRouter } from 'next/navigation';

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
   const router = useRouter();

  return (
    <div className="flex flex-col gap-10 max-w-128.5">
      {/* TITLE */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0">
          <p className="text-3xl font-semibold text-(--text-heading)">
            Capcanlı
          </p>
          <h2 className="text-4xl font-semibold text-(--text-fg-info)">
            Yayıncı Çekilişleri
          </h2>
        </div>

        <Button text="Yayıncı ol" variant="white" className="max-w-25" onClick={() => router.push('/streamers')}/>
      </div>

      {/* YAYINCILAR */}
      <div className="flex flex-wrap md:justify-between gap-8.5 z-10">
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
            {selectedId === i.id  && <p className="text-sm">{i.name}</p>}
          </button>
        ))}
      </div>
    </div>
  );
}
