"use client";

import { useEffect, useState } from "react";
import { Search } from "flowbite-react-icons/outline";
import { Input } from "@/components/common";

interface OrderSearchProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  debounceMs?: number;
}

export default function OrderSearch({
  value,
  onChange,
  disabled,
  debounceMs = 400,
}: OrderSearchProps) {
  const [localValue, setLocalValue] = useState(value);

  // Dışarıdan value sıfırlandığında (örn. filtre temizleme) sync et
  useEffect(() => {
    if (value === "" && localValue !== "") {
      setLocalValue("");
    }
  }, [value]);

  // Debounce: localValue değişince parent'a geciktirerek ilet
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localValue, debounceMs]);

  return (
    <div className="w-[240px] h-[40px]">
      <Input
        variant="default"
        inputSize="sm"
        leftIcon={<Search className="w-4 h-4" />}
        placeholder="Siparişlerimde ara"
        value={localValue}
        onClear={() => {
          setLocalValue("");
          onChange("");
        }}
        onChange={(e) => setLocalValue(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
}