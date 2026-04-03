import { Stepper } from "@/components/common"
import { RaffleStep } from "../../raffle.types";

const RAFFLE_STEPS = [
  { key: "info", label: "Çekiliş Bilgileri" },
  { key: "prize", label: "Ödül Seçimi" }, 
  { key: "payment", label: "Ödeme" },
];

export function RaffleStepper({ currentStep }: { currentStep: RaffleStep }) {
  return <Stepper items={RAFFLE_STEPS} activeKey={currentStep} />;
}