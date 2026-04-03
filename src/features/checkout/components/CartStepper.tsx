import { Stepper } from "@/components/common"
import { CartStep } from "../types";

const CART_STEPS = [
  { key: "items", label: "Sepetim" },
  { key: "delivery", label: "Teslimat" }, // Önceki kodunuzda Ödeme ve Teslimat yer değiştirmiş olabilir, kontrol edin :)
  { key: "payment", label: "Ödeme" },
];

export function CartStepper({ currentStep }: { currentStep: CartStep }) {
  return <Stepper items={CART_STEPS} activeKey={currentStep} />;
}