"use client";

import React, { useMemo } from "react";
import DropdownMenu from "../Dropdown/DropdownMenu"; // Dosya yolunu kontrol et
import { DropdownMenuItem } from "../Dropdown/dropdown.types";
import { Clock } from "flowbite-react-icons/outline";
import { cn } from "@/lib/utils";
import { format, parseISO, setHours, setMinutes, isValid } from "date-fns";

interface TimePickerProps {
  value?: string; // ISO String (z.string().datetime() uyumlu)
  onChange: (val: string | undefined) => void;
  disabled?: boolean;
  placeholder?: string;
  theme?: "default" | "light";
  iconPosition?: "left" | "right";
}

export function TimePicker({ 
  value, 
  onChange, 
  disabled, 
  placeholder = "Saat Seçin",
  theme = "default",
  iconPosition = "right"
}: TimePickerProps) {
  
  const timeItems: DropdownMenuItem[] = useMemo(() => {
    const items: DropdownMenuItem[] = [];
    for (let hour = 0; hour < 24; hour++) {
      ["00", "30"].forEach((minute) => {
        const timeStr = `${hour.toString().padStart(2, "0")}:${minute}`;
        items.push({
          id: timeStr,
          text: timeStr,
          value: timeStr,
          disabled: false
        });
      });
    }
    return items;
  }, []);

  const handleSelect = (item: DropdownMenuItem) => {
    const [hours, minutes] = (item.text).split(":").map(Number);
    
    let baseDate = value ? parseISO(value) : new Date();
    if (!isValid(baseDate)) baseDate = new Date();

    const updatedDate = setMinutes(setHours(baseDate, hours), minutes);
    onChange(updatedDate.toISOString());
  };

  const displayLabel = useMemo(() => {
    if (!value) return placeholder;
    const date = parseISO(value);
    return isValid(date) ? format(date, "HH:mm") : placeholder;
  }, [value, placeholder]);

  const themeStyles = {
    default: "bg-[#0d121a] border-gray-800 text-gray-300 hover:border-cyan-900",
    light: "bg-(--bg-neutral-secondary-medium) border-(--border-default-medium) text-(--text-body-subtle) hover:border-blue-400"
  };

  return (
    <DropdownMenu
      title="Saat Seçin"
      width="100%"
      items={timeItems}
      onSelect={handleSelect}
      className={theme === "light" ? "bg-(--bg-neutral-secondary-medium)" : "bg-[#0d121a]"}
      trigger={
        <div
          className={cn(
            "h-11 w-full flex items-center px-4 text-sm rounded-xl border transition-all shadow-sm cursor-pointer font-semibold",
            iconPosition === "right" ? "flex-row-reverse justify-between" : "flex-row gap-2",
            themeStyles[theme],
            disabled && "cursor-not-allowed pointer-events-none"
          )}
        >
          <Clock className={cn("w-4 h-4 shrink-0", theme === "default" ? "text-cyan-500" : "text-(--text-body-subtle)")} />
          <span className={cn("truncate", !value && "text-(--text-muted)")}>
            {displayLabel}
          </span>
        </div>
      }
    />
  );
}