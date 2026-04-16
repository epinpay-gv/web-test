"use client";
import { useCatalogStore } from "@/features/catalog/store/catalog.store";
import { useEffect, useState } from "react";
import { Input } from "@/components/common";

export function TopupInfoForm() {
  const { topupFields, setTopupValue } = useCatalogStore();
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    setTopupValue(values);
  }, [values, setTopupValue]);

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  if (!topupFields.length) {
    return <p className="text-sm text-muted-foreground">Yükleniyor...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {topupFields.map((field) => (
        <div key={field.key} className="flex flex-col gap-1">
          <label className="text-(--text-heading) text-sm font-medium">
            {field.label}
            {field.required && <span className="text-(--text-fg-danger)"> *</span>}
          </label>
          <Input
            type="text"
            name={field.key}
            placeholder={field.label}
            value={values[field.key] ?? ""}
            onChange={(e) => handleChange(field.key, e.target.value)}
            inputSize="base"
          />
        </div>
      ))}
    </div>
  );
}
