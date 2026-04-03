// PreviewCard/PreviewStoreInfo.tsx
"use client";
import Image from "next/image";

export default function PreviewStoreInfo() {
  return (
    <div className="flex items-center pt-2 pb-4 px-4 gap-1.5 border-t border-(--border-default) mt-2">
      {/* AVATAR */}
      <Image
        src="/avatars/default.webp" // Profilinden çekilebilir
        alt="Creator"
        width={24}
        height={24}
        priority
        className="rounded-full w-6 h-6 border border-neutral-700"
      />

      {/* INFO */}
      <div className="flex flex-col text-xs text-white">
        <p className="text-(--text-heading) font-semibold">Burak Altun</p>
        <p className="text-(--text-body)">Yayıncı</p>
      </div>
    </div>
  );
}