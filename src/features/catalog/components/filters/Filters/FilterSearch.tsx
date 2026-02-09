"use client";

import { Search } from "flowbite-react-icons/outline";
import { Input } from "@/components/common/Form/Input/Input";

interface FilterSearchProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export function FilterSearch({
  value,
  placeholder = "Ara",
  onChange,
}: FilterSearchProps) {
  return (
    <Input
      variant="default"
      leftIcon={<Search className="w-5 h-5" />}
      placeholder={placeholder}
      value={value}
      onClear={() => onChange("")}
      onChange={(e) => onChange(e.target.value)}
      rightIcon={<></>}
    />
  );
}
