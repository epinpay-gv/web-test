import { SectionProps } from "../../../raffle.types";

export function PrizeSection({ data, onUpdate, onNext, onPrev }: SectionProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div>
        <h2 className="text-xl font-bold text-white">Ödül Ayarları</h2>
        <p className="text-sm text-gray-500 mt-1">Çekilişin kazanan detaylarını belirleyin.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ödül Adedi */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Asil Talihli Sayısı
          </label>
          <input
            type="number"
            min={1}
            value={data.prizeCount}
            onChange={(e) => onUpdate({ prizeCount: Number(e.target.value) })}
            className="w-full bg-[#0d121a] border border-gray-800 rounded-xl p-3 text-sm focus:border-cyan-500 transition-all outline-none"
          />
        </div>

        {/* Yedek Sayısı */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Yedek Talihli Sayısı
          </label>
          <input
            type="number"
            min={0}
            value={data.backupCount}
            onChange={(e) => onUpdate({ backupCount: Number(e.target.value) })}
            className="w-full bg-[#0d121a] border border-gray-800 rounded-xl p-3 text-sm focus:border-cyan-500 transition-all outline-none"
          />
        </div>
      </div>

      {/* Ödül Ekleme Alanı (Görseldeki placeholder) */}
      <div className="p-10 border-2 border-dashed border-gray-800 rounded-2xl flex flex-col items-center justify-center bg-[#0d121a]/30 hover:bg-[#0d121a]/50 transition-colors cursor-pointer group">
        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform">
          <span className="text-2xl">+</span>
        </div>
        <p className="text-xs text-gray-500 mt-4 font-medium text-center">
          Çekilişe dahil edilecek ödülleri <br /> buradan yönetebilirsiniz.
        </p>
      </div>

      {/* Navigasyon Butonları */}
      <div className="flex gap-4 pt-6">
        <button
          onClick={onPrev}
          className="flex-1 py-3 rounded-xl bg-gray-800 text-sm font-semibold hover:bg-gray-700 transition-colors"
        >
          Geri Dön
        </button>
        <button
          onClick={onNext}
          className="flex-[2] py-3 rounded-xl bg-cyan-600 text-sm font-bold hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-900/20"
        >
          Ödeme Adımına Geç
        </button>
      </div>
    </div>
  );
}