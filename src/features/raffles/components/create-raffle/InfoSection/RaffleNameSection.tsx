import { Input } from "@/components/common";
import { RaffleFormData } from "@/features/raffles/raffle.types";

interface Props {
  data: RaffleFormData;
  onUpdate: (data: Partial<RaffleFormData>) => void;
}

export const RaffleNameSection = ({ data, onUpdate }: Props) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-bold text-(--text-heading) tracking-wider">
      Çekiliş Adı / Başlığı
    </label>
    <Input
      value={data.title}
      onChange={(e) => onUpdate({ title: e.target.value })}
      onClear={() => onUpdate({ title: "" })}
      placeholder="Çekiliş adı girin"
      inputSize="base"
      variant="default"
      wrapperClassName="w-full relative"
      className="border border-(--border-default-medium)"
    />
  </div>
);