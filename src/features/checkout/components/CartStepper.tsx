"use client";
import { CartStep } from "../types";

interface StepItem {
  key: CartStep;
  label: string;
}

const STEPS: StepItem[] = [
  { key: "items", label: "Sepetim" },
  { key: "delivery", label: "Ödeme" }, 
  { key: "payment", label: "Teslimat" },
];

export function CartStepper({ currentStep }: { currentStep: CartStep }) {  
  if (currentStep === "empty") return null;
  return (
    <div className="flex items-center justify-center bg-(--bg-neutral-primary-medium) w-full h-17 select-none">
      <div className="flex items-center gap-2 md:gap-8">
        {STEPS.map((step, index) => {
          const isActive = currentStep === step.key;

          return (
            <div key={step.key} className="flex items-center">              
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 flex justify-center items-center rounded-full border border-(--border-brand) text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "border-(--border-brand) text-(--text-fg-brand)"
                      : "border-(--border-default-strong) text-(--text-body)"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`text-sm font-semibold transition-colors duration-300 ${
                    isActive ? "text-(--text-fg-brand)" : "text-(--text-body)"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {index < STEPS.length - 1 && (
                <div className="mx-4 md:mx-8 w-2 md:w-9 h-px bg-(--border-default)" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}