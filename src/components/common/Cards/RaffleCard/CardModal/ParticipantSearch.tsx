"use client";
import { Search } from "flowbite-react-icons/outline";
import { Input } from "@/components/common";

interface ParticipantSearchProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export function ParticipantSearch({
  value,
  placeholder = "Ara",
  onChange,
}: ParticipantSearchProps) {
  return (
    <Input
      variant="default"
      inputSize= "sm"
      leftIcon={<Search className="w-5 h-5" />}
      placeholder={placeholder}
      value={value}
      onClear={() => onChange("")}
      onChange={(e) => onChange(e.target.value)}
      rightIcon={<></>}
    />
  );
}
