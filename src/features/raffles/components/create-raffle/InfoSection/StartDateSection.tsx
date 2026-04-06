import { CheckBox, TimePicker } from "@/components/common";
import { DatePicker } from "@/components/common/Calendar/DateRangePicker";
import { RaffleFormData } from "@/features/raffles/raffle.types";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  data: RaffleFormData;
  onUpdate: (data: Partial<RaffleFormData>) => void;
}

export const StartDateSection = ({ data, onUpdate }: Props) => (
  <div className="flex flex-col gap-5">
    <div className="flex flex-col gap-1">
      <label className="text-base font-bold text-(--text-heading) tracking-wider ml-1">
        Başlangıç Tarihi Belirle
      </label>
      <span className="text-(--text-body) text-sm ml-1">
        Seçilmediği durumda çekiliş hemen başlar.
      </span>
    </div>

    <CheckBox
      id="enable-start-date"
      variant="square"
      label="İleri bir tarihte başlat"
      helperText="Bu seçenek işaretlenmezse çekiliş onaylandığı an yayına girer."
      labelClass="text-sm font-medium "
      checked={data.startDate !== undefined}
      onCheckedChange={(checked) => {
        onUpdate({ startDate: checked ? new Date().toISOString() : undefined });
      }}
    />

    <AnimatePresence>
      {data.startDate !== undefined && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -10 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="flex items-center gap-6 ">
            <div className="flex flex-col gap-2 w-1/2">
              <span className="text-sm text-(--text-heading) font-medium ml-1">Başlangıç Tarihi</span>
              <DatePicker
                mode="single"
                theme="light"
                value={data.startDate}
                onChange={(val) => onUpdate({ startDate: val })}
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <span className="text-sm text-(--text-heading) font-medium ml-1">Başlangıç Saati</span>
              <TimePicker
                theme="light"
                value={data.startDate}
                onChange={(val) => onUpdate({ startDate: val })}
                disabled={!data.startDate}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);