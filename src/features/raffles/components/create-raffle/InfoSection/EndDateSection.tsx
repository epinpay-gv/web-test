import { TimePicker } from "@/components/common";
import { DatePicker } from "@/components/common/Calendar/DateRangePicker";
import { RaffleFormData } from "@/features/raffles/raffle.types";

interface Props {
  data: RaffleFormData;
  onUpdate: (data: Partial<RaffleFormData>) => void;
}

export const EndDateSection = ({ data, onUpdate }: Props) => (
  <div className="flex flex-col gap-4">
    <label className="text-base font-bold text-(--text-heading) tracking-wider ml-1">
      Bitiş tarihi ve saati belirle
    </label>
    <div className="flex items-center gap-6">
      <div className="flex flex-col gap-2 w-1/2">
        <span className="text-sm text-(--text-heading) font-medium ml-1">Tarih</span>
        <DatePicker
          mode="single"
          theme="light"
          value={data.endDate}
          onChange={(val) => onUpdate({ endDate: val })}
          placeholder="GG.AA.YYYY"
        />
      </div>
      <div className="flex flex-col gap-2 w-1/2">
        <span className="text-sm text-(--text-heading) font-medium ml-1">Saat</span>
        <TimePicker
          theme="light"
          value={data.endDate}
          onChange={(val) => onUpdate({ endDate: val })}
          disabled={!data.endDate}
        />
      </div>
    </div>
  </div>
);