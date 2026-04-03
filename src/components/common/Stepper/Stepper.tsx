"use client";
import { Check } from "flowbite-react-icons/outline";

interface StepItem {
  key: string;
  label: string;
}

interface StepperProps {
  items: StepItem[];
  activeKey: string;
}

export function Stepper({ items, activeKey }: StepperProps) {
  const activeIndex = items.findIndex((s) => s.key === activeKey);

  return (
    <div className="flex relative items-center justify-center bg-(--bg-neutral-primary-medium) w-full h-17 select-none border-b border-(--border-default)">
      <div className="flex items-center gap-2 md:gap-8">
        {items.map((step, index) => {
          const isActive = activeKey === step.key;
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
                <span
                  className={`text-sm font-semibold ${
                    isActive || isCompleted ? "text-(--text-fg-brand)" : "text-(--text-body)"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < items.length - 1 && (
                <div className="mx-4 md:mx-8 w-6 md:w-9 h-px bg-(--border-default)" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}