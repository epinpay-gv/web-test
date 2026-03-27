"use client";
import { useCatalogStore } from "@/features/catalog/store/catalog.store";
import { useEffect, useState } from "react";
import { Input } from "@/components/common";

export function TopupInfoForm() {
  const { topupFields, setTopupValue } = useCatalogStore();
  const [values, setValues] = useState<Record<number, string>>({});

  useEffect(() => {
    const payload = topupFields.map((field) => ({
      id: field.id,
      value: values[field.id] ?? "",
    }));
    setTopupValue(payload);
  }, [values, topupFields, setTopupValue]);

  const handleChange = (id: number, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  if (!topupFields.length) {
    return <p className="text-sm text-muted-foreground">Yükleniyor...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {topupFields.map((field) => (
        <div key={field.id} className="flex flex-col gap-1">
          <label className="text-(--text-heading) text-sm font-medium">
            {field.label} <span className="text-(--text-fg-danger)">*</span>
          </label>
          <Input
            type="text"
            name="email"
            placeholder={field.value}
            value={values[field.id] ?? ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            inputSize="base"
          />
        </div>
      ))}
    </div>
  );
}
