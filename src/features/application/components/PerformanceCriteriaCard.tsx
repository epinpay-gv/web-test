import Image from "next/image";
import { PerformanceCriteriaItem } from "../types/application.type";


interface Props {
  item: PerformanceCriteriaItem;
}

export default function PerformanceCriteriaCard({ item }: Props) {
  return (
    <div className="w-[182.4px] h-67.5 bg-(--bg-neutral-primary-medium) rounded-xl border border-(--border-default-strong) flex flex-col overflow-hidden">

      {/* Üst: Görsel alanı */}
      <div className="h-15 shrink-0 p-5">
        <Image
          src={item.image}
          alt={item.title}
          width={27}
          height={27}
          className="object-contain"
        />
      </div>

      {/* Alt: Başlık + Açıklama */}
      <div className="flex flex-col p-3 flex-1">
        <p className="font-semibold text-base w-[150.4px] h-15 leading-snug">
          {item.title}
        </p>
        <p className="text-sm text-(--text-body) w-[150.4px] mt-2 ">
          {item.description}
        </p>
      </div>

    </div>
  );
}