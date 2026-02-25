"use client";
import { CartStep } from "../types";
import { Check } from "flowbite-react-icons/outline";

const STEPS = [
  { key: "items", label: "Sepetim" },
  { key: "delivery", label: "Ödeme" }, 
  { key: "payment", label: "Teslimat" },
];

export function CartStepper({ currentStep }: { currentStep: CartStep }) {  
  const activeIndex = STEPS.findIndex(s => s.key === currentStep);

  return (
    <div className="flex items-center justify-center bg-(--bg-neutral-primary-medium) w-full h-17 select-none border-b border-(--border-default)">
      <div className="flex items-center gap-2 md:gap-8">
        {STEPS.map((step, index) => {
          const isActive = currentStep === step.key;
          const isCompleted = index < activeIndex;

          return (
            <div key={step.key} className="flex items-center">              
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 flex justify-center items-center rounded-full border text-[10px] font-bold transition-all duration-300 ${
                    isActive || isCompleted
                      ? "border-(--border-brand) text-(--text-fg-brand)"
                      : "border-(--border-default-strong) text-(--text-body)"
                  }`}
                >
                  {isCompleted ? <Check className="w-3 h-3" /> : index + 1}
                </div>
                <span className={`text-sm font-semibold ${isActive || isCompleted ? "text-(--text-fg-brand)" : "text-(--text-body)"}`}>
                  {step.label}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div className={`mx-4 md:mx-8 w-6 md:w-9 h-px bg-(--border-default)`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}