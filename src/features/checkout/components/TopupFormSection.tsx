"use client";
import { Input } from "@/components/common";
import { CartItem } from "../types";

interface TopupFormSectionProps {
  items: CartItem[];
  topupData: Record<string, Record<string, string>>;
  onChange: (offerId: string, fieldKey: string, value: string) => void;
}

export function TopupFormSection({ items, topupData, onChange }: TopupFormSectionProps) {
  const topupItems = items.filter((item) => item.formType != null);

  if (topupItems.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex flex-col gap-3 max-h-19 overflow-hidden">
        <h2 className="text-xl font-semibold text-(--text-heading) leading-7">
          Oyun Hesap Bilgileri
        </h2>
        <p className="text-sm text-(--text-heading) opacity-70">
          Top-up ürünleri için aşağıdaki bilgileri eksiksiz doldurunuz.
        </p>
      </div>

      {topupItems.map((item) => (
        <div
          key={item.offerId}
          className="bg-(--bg-neutral-primary-soft) border border-[#1D303A] p-6 rounded-(--radius-base) flex flex-col gap-6"
        >
          <span className="text-sm font-semibold text-(--text-heading)">
            {item.translation?.name ?? "Ürün"}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {item.formType!.fields.map((field) => (
              <div key={field.key} className="flex flex-col gap-2.5">
                <label className="text-(--text-heading) text-sm font-medium">
                  {field.label}
                  {field.required && (
                    <span className="text-(--text-fg-danger)"> *</span>
                  )}
                </label>
                <Input
                  type="text"
                  name={field.key}
                  value={topupData[item.offerId]?.[field.key] ?? ""}
                  onChange={(e) => onChange(item.offerId, field.key, e.target.value)}
                  placeholder={field.label}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
