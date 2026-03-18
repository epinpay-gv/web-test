"use client";
interface MainBannerRightProps {
  data: string; 
}

export default function MainBannerRight({ data }: MainBannerRightProps) {
  if (!data) {
    return (
      <div className="animate-fade-in w-165 h-84.5 aspect-video rounded-xl bg-white/5 flex items-center justify-center">
        <span className="text-white/30 text-sm">Yayın yükleniyor...</span>
      </div>
    );
  }

  return (
    <div className="animate-fade-in w-150 h-84.5 aspect-video rounded-2xl overflow-y-hidden shadow-2xl border-8 border-white/40">
      <iframe
        src={data}
        width="660"       
        height="338"      
        className="w-full h-full block" 
        allowFullScreen
        allow="autoplay; fullscreen"
        title="Streamer yayını"
      />
    </div>
  );
}