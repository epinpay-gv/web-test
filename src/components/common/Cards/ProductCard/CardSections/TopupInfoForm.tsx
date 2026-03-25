"use client";
import { useCatalogStore } from "@/features/catalog/store/catalog.store";
import { useEffect, useState } from "react";

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
          <label className="text-sm font-medium">{field.label}</label>
          <input
            type="text"
            placeholder={field.value}
            value={values[field.id] ?? ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          />
        </div>
      ))}
    </div>
  );
}