"use client";

import { useEffect, useState } from "react";
import { Search } from "flowbite-react-icons/outline";
import { Input } from "@/components/common";

interface UserPageSearchProps {
  value: string;
  onChange: (value: string) => void;
  debounceMs?: number;
}

export default function UserPageSearch({
  value,
  onChange,
  debounceMs = 400,
}: UserPageSearchProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce: kullanıcı yazmayı bırakınca parent'a ilet
  useEffect(() => {
    if (localValue === value) return;
    const timer = setTimeout(() => onChange(localValue), debounceMs);
    return () => clearTimeout(timer);
 }, [localValue, value, onChange, debounceMs]);

  return (
    <div className="w-60 h-10">
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
      />
    </div>
  );
}