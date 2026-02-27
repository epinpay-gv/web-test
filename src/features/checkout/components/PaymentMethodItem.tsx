"use client";
import { PaymentMethod } from "../types";
import { ArrowRight } from "flowbite-react-icons/outline";
import Image from "next/image";
import { Badge } from "@/components/common";

interface PaymentMethodItemProps {
  method: PaymentMethod;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function PaymentMethodItem({
  method,
  isSelected,
  onSelect,
}: PaymentMethodItemProps) {
  const isDisabled = method.status === "disabled";

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={() => !isDisabled && onSelect(method.id)}
      className={`
        w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 group text-left
        ${
          isDisabled
            ? "cursor-not-allowed bg-(--bg-neutral-secondary) border-(--border-default) bg-transparent"
            : isSelected
            ? "border-(--border-brand-subtle) bg-(--bg-brand-softer) "
            : "border-(--border-default) border bg-(--bg-neutral-secondary-soft) transition"
        }
      `}
    >
      <div className="flex items-center gap-4">    
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1.5 shrink-0 shadow-sm">
          <Image
            src={method.icon}
            alt={method.name}
            width={27}
            height={18}
            className="w-full h-full object-contain"
          />
        </div>        
        <div className="flex flex-col border-l pl-3.5 border-(--border-default)">
          <div className="flex items-center gap-2">
            <span
              className={`font-semibold text-base transition-colors ${
                isDisabled ? "text-(--text-fg-disabled)" :
                isSelected ? "text-(--text-fg-brand)" : "text-(--text-heading)"
              }`}
            >
              {method.name}
            </span>
            <Badge text={method.commission} theme={!isDisabled ? "brand" : "white_disabled"}/>  
                        
          </div>
          <p
            className={`text-xs mt-0.5 font-medium transition-colors ${
                isDisabled ? "text-(--text-fg-disabled)" :
                isSelected ? "text-(--text-fg-brand)" : "text-(--text-body)"
            }`}
          >
            {method.description}
          </p>
        </div>
      </div>

      {/* Sağ Ok İkonu */}
      {!isDisabled && (
        <div
          className={`transition-all duration-300 ${
            isSelected
              ? "text-(--text-fg-brand) translate-x-1"
              : "text-(--text-body-subtle) group-hover:translate-x-1 "
          }`}
        >
          <ArrowRight className="w-6 h-6" />
        </div>
      )}
    </button>
  );
}