import { CheckBox } from "@/components/common";
import { RaffleFormData } from "@/features/raffles/raffle.types";
import { ParticipationConstraint } from "@/types/types";

interface ParticipantOption {
  value: ParticipationConstraint;
  label: string;
  disabled?: boolean;
}

interface Props {
  data: RaffleFormData;
  onUpdate: (data: Partial<RaffleFormData>) => void;
  options: ParticipantOption[];
}

export const ParticipantTypeSection = ({ data, onUpdate, options }: Props) => (
  <div className="flex flex-col gap-3">
    <label className="text-sm font-bold text-(--text-heading) tracking-wider">
      Kimler katılabilir
    </label>
    <div className="flex flex-wrap items-center gap-6 p-1">
      {options.map((option) => (
        <CheckBox
          key={option.value}
          id={`constraint-${option.value}`}
          label={option.label}
          variant="square"
          checked={data.constraint === option.value}
          disabled={option.disabled}
          onCheckedChange={(checked) => {
            // Sadece seçildiğinde güncelleme yapıyoruz (Radio button mantığı)
            if (checked) onUpdate({ constraint: option.value });
          }}
        />
      ))}
    </div>
  </div>
);