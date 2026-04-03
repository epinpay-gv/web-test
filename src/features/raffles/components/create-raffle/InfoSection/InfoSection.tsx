import { SectionProps } from "@/features/raffles/raffle.types";

export function InfoSection({ data, onUpdate, onNext }: SectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold">Çekiliş Adı</label>
        <input 
          value={data.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          className="bg-[#0d121a] border border-gray-800 rounded-lg p-3 text-sm focus:border-cyan-500 outline-none"
          placeholder="Örn: Discord Nitro Çekilişi"
        />
      </div>
      <button onClick={onNext} className="...">Sonraki Adım</button>
    </div>
  );
}