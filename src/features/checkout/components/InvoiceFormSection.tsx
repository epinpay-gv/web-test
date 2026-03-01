"use client";
import { Input } from "@/components/common";
import { InvoiceForm } from "../types";

interface InvoiceFormSectionProps {
  formData: InvoiceForm;
  onInputChange: (field: keyof InvoiceForm) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InvoiceFormSection({ formData, onInputChange }: InvoiceFormSectionProps) {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex flex-col gap-3 max-h-19 overflow-hidden">
        <h2 className="text-xl font-semibold text-(--text-heading) leading-7">
          Fatura bilgilerinizi girin
        </h2>
        <p className="text-sm text-(--text-heading) opacity-70">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever.
        </p>
      </div>

      <div className="bg-(--bg-neutral-primary-soft) border border-[#1D303A] p-6 rounded-(--radius-base) grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ad */}
        <div className="flex flex-col gap-2.5">
          <label className="text-(--text-heading) text-sm font-medium">
            Ad <span className="text-(--text-fg-danger)">*</span>
          </label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={onInputChange("name")}
            placeholder="Adınızı girin"
          />
        </div>

        {/* Soyad */}
        <div className="flex flex-col gap-2.5">
          <label className="text-(--text-heading) text-sm font-medium">
            Soyad <span className="text-(--text-fg-danger)">*</span>
          </label>
          <Input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={onInputChange("surname")}
            placeholder="Soyadınızı girin"
          />
        </div>

        {/* Ülke */}
        <div className="flex flex-col gap-2.5">
          <label className="text-(--text-heading) text-sm font-medium">
            Ülke <span className="text-(--text-fg-danger)">*</span>
          </label>
          <Input
            type="text"
            name="country"
            value={formData.country}
            onChange={onInputChange("country")}
            placeholder="Ülkenizi girin"
          />
        </div>
        
        <div className="flex flex-col gap-2.5">
          <label className="text-(--text-heading) text-sm font-medium">
            Şehir <span className="text-(--text-fg-danger)">*</span>
          </label>
          <Input
            type="text"
            name="city"
            value={formData.city}
            onChange={onInputChange("city")}
            placeholder="Şehrinizi girin"
          />
        </div>
      </div>
    </div>
  );
}