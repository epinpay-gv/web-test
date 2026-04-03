// PreviewCard/PreviewCardInfo.tsx
"use client";
import { useMemo } from "react";
import { SHIMMER_CLASS } from "./preview.utils";

interface PreviewCardInfoProps {
  title: string;
  isLoading: boolean;
  timeLeft: string; // useMemo ile hesaplanıp buraya geçecek
}

export default function PreviewCardInfo({ title, isLoading, timeLeft }: PreviewCardInfoProps) {
  // SKELETON GÖRÜNÜMÜ (Başlık boşsa)
  if (isLoading) {
    return (
      <div className="flex flex-col flex-1 px-3 py-2 md:px-4 md:py-3 gap-2 md:gap-4">
        {/* TITLE Skeleton */}
        <div className="space-y-1">
          <div className={`w-full h-4 ${SHIMMER_CLASS}`} />
          <div className={`w-3/4 h-4 ${SHIMMER_CLASS}`} />
        </div>

        {/* INFO Skeleton */}
        <div className="flex justify-around w-full">
          {[0, 1].map((i) => (
            <div key={i} className="flex flex-col gap-1 items-center">
              <div className={`w-12 h-3 ${SHIMMER_CLASS}`} />
              <div className={`w-16 h-4 ${SHIMMER_CLASS}`} />
            </div>
          ))}
        </div>

        {/* ACTION Skeleton */}
        <div className={`w-full h-13 md:h-14 ${SHIMMER_CLASS} mt-auto`} />
      </div>
    );
  }

  // CANLI GÖRÜNÜM
  return (
    <div className="flex flex-col flex-1 px-3 py-2 md:px-4 md:py-3 gap-2 md:gap-4 text-white">
      {/* TITLE */}
      <p className="text-(--text-heading) h-10.5 text-sm font-semibold leading-[150%] line-clamp-2">
        {title}
      </p>

      {/* INFO (Statik veriler, preview için) */}
      <div className="flex justify-around w-full">
        <div className="flex flex-col gap-0 items-center">
          <p className="text-xs text-(--text-body) leading-[150%]">Ödül Değeri</p>
          <p className="text-sm font-bold leading-[150%] text-(--text-fg-success-strong)">0 $</p>
        </div>
        <div className="flex flex-col gap-0 items-center">
          <p className="text-xs text-(--text-body) leading-[150%]">Katılımcı</p>
          <p className="text-sm font-bold leading-[150%] text-(--text-fg-brand-subtle)">0 kişi</p>
        </div>
      </div>

      {/* ACTION (Statik "Hemen katıl" butonu) */}
      <div className="w-full h-13 md:h-14 mt-auto cursor-pointer text-xs font-base rounded-lg py-1 px-3 bg-(--bg-brand) shadow-xs flex flex-col gap-1 items-center justify-center">
        <p className="text-black leading-5">Hemen katıl</p>
        <div className="rounded-sm py-0.5 px-2 bg-(--bg-brand-soft) text-(--text-fg-brand) leading-4">
          Son {timeLeft}
        </div>
      </div>
    </div>
  );
}