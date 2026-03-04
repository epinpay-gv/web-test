"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { tr } from "date-fns/locale";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight, CalendarWeek } from "flowbite-react-icons/outline";
import { Button } from "@/components/common";
import "react-day-picker/dist/style.css";

interface DatePickerProps {
  value?: { from?: string; to?: string };
  onChange: (range?: { from?: string; to?: string }) => void;
}

const DAY_PICKER_CLASS_NAMES = {
  root: "p-3",
  months: "flex flex-col",
  month: "space-y-3",
  month_caption: "flex justify-center items-center relative h-8",
  caption_label: "text-sm font-semibold text-(--text-white)",
  nav: "flex items-center justify-between absolute inset-x-3 top-0 h-8",
  button_previous:
    "flex items-center justify-center w-7 h-7 rounded-lg  transition-colors text-(--text-body) hover:text-(--text-white)",
  button_next:
    "flex items-center justify-center w-7 h-7 rounded-lg  transition-colors text-(--text-body) hover:text-(--text-white)",
  weeks: "space-y-1",
  weekdays: "flex",
  weekday: "w-9 text-center text-xs text-(--text-body) font-medium pb-1",
  week: "flex",
  day: "w-9 h-9 flex items-center justify-center relative",
  day_button:
    "w-8 h-8 rounded-lg text-sm transition-colors relative z-10 text-(--text-white)  focus:outline-none",
    range_start:
    "!bg-(--bg-brand) !text-white !rounded-l-lg !rounded-r-none font-semibold",
  range_end:
    "!bg-(--bg-brand) !text-white !rounded-r-lg !rounded-l-none font-semibold",
  range_middle:
    "!rounded-none !bg-[#33444E] !text-(--text-white)",
  today:
    "font-bold text-(--text-fg-brand) border border-(--border-brand-light) rounded-lg",
  outside: "text-(--text-body) opacity-40",
  disabled: "opacity-20 cursor-not-allowed",
};

function formatDisplayLabel(value?: { from?: string; to?: string }): string | undefined {
  if (!value?.from && !value?.to) return undefined;
  const from = value.from ? format(new Date(value.from), "dd.MM.yyyy") : "…";
  const to = value.to ? format(new Date(value.to), "dd.MM.yyyy") : "…";
  if (value.from && value.to) return `${from} - ${to}`;
  if (value.from) return `${from} -`;
  return `- ${to}`;
}

function valueToDateRange(value?: { from?: string; to?: string }): DateRange | undefined {
  if (!value?.from && !value?.to) return undefined;
  return {
    from: value.from ? new Date(value.from) : undefined,
    to: value.to ? new Date(value.to) : undefined,
  };
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selected, setSelected] = useState<DateRange | undefined>(valueToDateRange(value));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!open || isMobile) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, isMobile]);

  useEffect(() => {
    setSelected(valueToDateRange(value));
  }, [value?.from, value?.to]);

  const handleApply = () => {
    if (selected?.from || selected?.to) {
      onChange({
        from: selected.from ? format(selected.from, "yyyy-MM-dd") : undefined,
        to: selected.to ? format(selected.to, "yyyy-MM-dd") : undefined,
      });
    }
    setOpen(false);
  };

  const handleClear = () => {
    setSelected(undefined);
    onChange(undefined);
    setOpen(false);
  };

  const displayLabel = formatDisplayLabel(value);
  const hasValue = Boolean(value?.from || value?.to);

  const calendarContent = (
    <div className="flex flex-col">
      <DayPicker
        mode="range"
        selected={selected}
        onSelect={setSelected}
        locale={tr}
        showOutsideDays
        classNames={DAY_PICKER_CLASS_NAMES}
        components={{
          Chevron: ({ orientation }) =>
            orientation === "left"
              ? <ArrowLeft className="w-4 h-4" />
              : <ArrowRight className="w-4 h-4" />,
        }}
      />


      <div className="flex flex-col md:flex-row gap-2 px-3 pb-3">
        <Button
          text="Temizle"
          variant="secondary"
          appearance="outline"
          padding="sm"
          textSize="sm"
          size="full"
          onClick={handleClear}
        />
        <Button
          text="Onayla"
          variant="brand"
          appearance="filled"
          padding="sm"
          textSize="sm"
          size="full"
          onClick={handleApply}
        />
      </div>
    </div>
  );

  return (
    <>

<div ref={containerRef} className="relative w-full sm:w-auto">
  <button
    type="button"
    aria-label="Tarih aralığı filtrele"
    onClick={() => setOpen((v) => !v)}
    className={`
      w-full sm:w-auto h-[40px] flex items-center gap-1.5 px-4 text-sm font-medium transition-colors border rounded-[12px] bg-(--bg-neutral-secondary-medium)
    ${hasValue
  ? " text-white border-(--border-brand)"
  : " text-(--text-body) border-(--border-default-medium)"}
    `}
  >
    <CalendarWeek className="w-4 h-4 shrink-0" />
    {displayLabel && <span className="truncate">{displayLabel}</span>}
  </button>

  {open && !isMobile && (
    <div className="absolute right-0 top-12 z-50 rounded-2xl border border-(--border-default-medium) bg-(--bg-neutral-primary-soft) shadow-2xl min-w-[280px]">
      {calendarContent} 
    </div>
  )}
</div>

      {open && isMobile && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60" onClick={() => setOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border-t border-(--border-default-medium) bg-(--bg-neutral-primary-soft) pb-safe animate-in slide-in-from-bottom duration-300">
            {calendarContent}
          </div>
        </>
      )}
    </>
  );
}