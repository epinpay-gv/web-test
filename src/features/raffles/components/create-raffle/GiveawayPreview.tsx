// components/GiveawayPreview.tsx
import { RaffleFormData } from "../../raffle.types";

export function GiveawayPreview({ data }: { data: RaffleFormData }) {
  return (
    <div className="w-full h-150 bg-linear-to-br from-orange-400/80 to-white/10 rounded-[40px] flex items-center justify-center p-4">
      <div className="w-72 bg-[#0a1016] rounded-3xl overflow-hidden shadow-2xl border border-white/5">
        <div className="h-44 bg-linear-to-tr from-cyan-500 to-blue-500 flex items-center justify-center">
           {/* Dinamik Tip Etiketi */}
           <div className="absolute top-4 right-4 bg-orange-500 px-2 py-1 rounded text-[10px] font-bold">
             {data.type.toUpperCase()}
           </div>
           <span className="text-white/20 font-bold">GÖRSEL</span>
        </div>

        <div className="p-5 space-y-4">
          <div className="min-h-12.5">
            <h3 className="text-white font-bold text-sm wrap-break-word">
              {data.title || "Çekiliş Başlığı Burada Görünecek"}
            </h3>
            <p className="text-gray-500 text-[10px] mt-1 line-clamp-2">
              {data.description || "Açıklama henüz girilmedi..."}
            </p>
          </div>
          
          <div className="flex justify-between items-center text-[10px] text-gray-400">
             <span>Ödül: {data.prizeCount} Adet</span>
             <span>Yedek: {data.backupCount}</span>
          </div>

          <button className="w-full py-3 bg-cyan-500 rounded-xl font-bold text-xs uppercase tracking-wider">
            Katıl
          </button>
        </div>
      </div>
    </div>
  );
}