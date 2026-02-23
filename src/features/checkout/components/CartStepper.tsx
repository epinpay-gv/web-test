"use client";
import { Check } from "lucide-react";
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
  // Sepet boşsa stepper'ı gösterme
  if (currentStep === "empty") return null;

  // Mevcut adımın index'ini bul
  const currentIndex = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <div className="flex items-center justify-center w-full py-6 select-none">
      <div className="flex items-center gap-2 md:gap-8">
        {STEPS.map((step, index) => {
          const isActive = currentStep === step.key;
          const isCompleted = index < currentIndex;

          return (
            <div key={step.key} className="flex items-center">
              {/* Adım Dairesi ve Metni */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                      : isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-[#1e293b] text-gray-500 border border-gray-800"
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <span
                  className={`text-sm font-semibold transition-colors duration-300 ${
                    isActive ? "text-cyan-400" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Aradaki Çizgi */}
              {index < STEPS.length - 1 && (
                <div className="mx-4 md:mx-8 w-8 md:w-16 h-px bg-gray-800" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}