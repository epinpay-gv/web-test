"use client";
import { getOptimizedStreamUrl } from "../../utils/stream.utils";
import { useState } from "react";
import { Play } from "flowbite-react-icons/solid";

interface MainBannerRightProps {
  data: string;
}

export default function MainBannerRight({ data }: MainBannerRightProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!data) {
    return (
      <div className="animate-fade-in w-165 h-84.5 aspect-video rounded-xl bg-white/5 flex items-center justify-center">
        <span className="text-white/30 text-sm">Yayın yükleniyor...</span>
      </div>
    );
  }

  return (
    <div 
      className="hidden md:block group relative animate-fade-in w-150 h-84.5 aspect-video rounded-2xl overflow-y-hidden shadow-2xl border-8 border-white/40 cursor-pointer"
      onClick={!isPlaying ? () => setIsPlaying(true) : undefined}
    >
      {!isPlaying ? (
        <div className="relative w-full h-full bg-neutral-900 flex items-center justify-center overflow-hidden">
          {/* ARKA PLAN DEGRADESİ */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 to-neutral-900 opacity-60" />
          
          {/* PLAY BUTONU */}
          <div className="z-10 flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-(--bg-brand) rounded-full flex items-center justify-center text-white shadow-2xl transform group-hover:scale-110 transition-all duration-300">
              <Play className="w-8 h-8 ml-1" />
            </div>
            <span className="text-white/80 font-medium tracking-wide text-sm bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-md">
                YAYINI İZLE
            </span>
          </div>
        </div>
      ) : (
        <iframe
          src={`${getOptimizedStreamUrl(data)}${data.includes("?") ? "&" : "?"}autoplay=1`}
          width="660"
          height="338"
          className="w-full h-full block"
          allowFullScreen
          allow="autoplay; fullscreen"
          title="Streamer yayını"
        />
      )}
    </div>
  );
}