import { CheckBox } from "@/components/common";
import { RaffleFormData } from "@/features/raffles/raffle.types";

// RaffleFormData["type"] kullanarak id'nin form verisiyle %100 uyumlu olmasını sağlıyoruz
interface ParticipationType {
  id: RaffleFormData["type"];
  title: string;
  description: string;
}

interface Props {
  data: RaffleFormData;
  onUpdate: (data: Partial<RaffleFormData>) => void;
  types: ParticipationType[];
}

export const ParticipationTypeSection = ({ data, onUpdate, types }: Props) => {
  // İlk elemanı (Bedelsiz) ve diğerlerini ayırıyoruz
  const [primaryType, ...secondaryTypes] = types;

  return (
    <div className="flex flex-col gap-4">
      <label className="text-sm font-bold text-(--text-heading) tracking-wider">
        Katılım Tipi
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Aktif Kart */}
        <div
          onClick={() => onUpdate({ type: primaryType.id })}
          className="p-4 rounded-(--radius-base) border-2 border-(--border-default) cursor-pointer transition-all duration-300 hover:border-blue-500/50"
        >
          <CheckBox
            label={primaryType.title}
            checked={data.type === primaryType.id}
            onCheckedChange={() => onUpdate({ type: primaryType.id })}
            className="mb-2"
          />
          <p className="text-[10px] text-(--text-body) leading-relaxed pl-9">
            {primaryType.description}
          </p>
        </div>

        {/* Devre Dışı Kartlar */}
        <div className="flex flex-col gap-4">
          {secondaryTypes.map((type) => (
            <div
              key={type.id}
              className="p-4 rounded-(--radius-base) opacity-40 border-2 border-(--border-default) cursor-not-allowed flex flex-col gap-1"
            >
              <CheckBox
                label={type.title}
                checked={data.type === type.id}
                disabled={true}
                onCheckedChange={() => {}} // Disabled olduğu için işlem yapmıyoruz
              />
              <p className="text-[11px] text-(--text-body) leading-snug pl-9">
                {type.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};