"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import DropdownListItem from "./DropdownListItem";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  icon?: ReactNode;
  onChange?: (value: string) => void;
}

export default function Dropdown({
  options,
  value,
  placeholder = "Seçiniz",
  icon,
  onChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (val: string) => {
    onChange?.(val);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full border rounded-md px-3 py-2 text-sm bg-(--bg-neutral-secondary-medium)"
      >
        <div className="flex items-center justify-between w-full">
          <span className="truncate">
            {selectedOption?.label || placeholder}
          </span>

          {icon && (
            <span className="ml-2 flex items-center shrink-0 text-(--text-body-subtle) w-[10.67px] h-1.5">
              {icon}
            </span>
          )}
        </div>
      </button>

      {/* Menu */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-md border bg-(--bg-neutral-secondary-medium) p-1 space-y-1">
          {options.map((option) => (
            <DropdownListItem
              key={option.value}
              text={option.label}
              state={value === option.value ? "active" : "initial"}
              onClick={() => handleSelect(option.value)}
            />
          ))}
        </div>
      )}
    </div>
  );
}