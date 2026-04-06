import { Textarea } from "@/components/common";
import { RaffleFormData } from "@/features/raffles/raffle.types";

interface Props {
  data: RaffleFormData;
  onUpdate: (data: Partial<RaffleFormData>) => void;
}

export const RaffleDescriptionSection = ({ data, onUpdate }: Props) => (
  <div className="flex flex-col w-1/2 gap-2">
    <label className="text-sm font-bold text-(--text-heading) tracking-wider">
      Çekiliş Açıklaması
    </label>
    <Textarea
      value={data.description}
      onChange={(e) => onUpdate({ description: e.target.value })}
      placeholder="Çekiliş açıklaması girebilirsiniz"
      rows={5}
      className="bg-(--bg-neutral-secondary-medium)! border-(--border-default-medium)"
    />
    <p className="text-xs text-(--text-body)">Opsiyonel</p>
  </div>
);