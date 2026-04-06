"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { tr } from "date-fns/locale";
import { format, isValid, parseISO, setHours, setMinutes, setSeconds } from "date-fns";
import { ArrowLeft, ArrowRight, CalendarWeek } from "flowbite-react-icons/outline";
import { Button } from "@/components/common";
import { cn } from "@/lib/utils";
import "react-day-picker/dist/style.css";

// --- TEMALAR ---
const THEMES = {
  default: {
    button: "bg-[#0d121a] border-gray-800 text-gray-300 hover:border-cyan-900",
    calendar: "bg-[#0d121a] border-gray-800 text-white",
    accentIcon: "text-cyan-500",
    classNames: {
      selected: "!bg-cyan-600 !text-white rounded-(--radius-base)",
      range_start: "!bg-cyan-600 !text-white",
      range_end: "!bg-cyan-600 !text-white",
      range_middle: "!bg-cyan-900/30 !text-white",
      today: "text-cyan-400 border-cyan-900",
      day_button: "hover:bg-cyan-900/30",
      caption_label: "text-white"
    }
  },
  light: {
    button: "bg-(--bg-neutral-secondary-medium) w-full border-(--border-default-medium) text-(--text-body-subtle)",
    calendar: "bg-(--bg-neutral-secondary-medium) border-(--border-default-medium) text-(--text-body-subtle)",
    accentIcon: "text-(--text-body-subtle)",
    classNames: {
      selected: "!bg-(--bg-brand) !text-(--text-heading) rounded-(--radius-base)",
      range_start: "!bg-(--bg-brand) !text-(--text-heading) rounded-l-(--radius-base)",
      range_end: "!bg-(--bg-brand) !text-(--text-heading) rounded-r-(--radius-base)",
      range_middle: "!bg-(--bg-neutral-tertiary-medium) !text-(--text-heading)",
      today: "",
      day_button: "hover:bg-(--bg-neutral-tertiary)",
      caption_label: "text-(--text-body) font-bold"
    }
  }
};

const BASE_CLASS_NAMES = {
  root: "p-3",
  months: "flex flex-col",
  month: "space-y-3",
  month_caption: "flex justify-center items-center relative h-8",
  nav: "flex items-center justify-between absolute inset-x-3 top-0 h-8",
  button_previous: "flex items-center justify-center w-7 h-7 rounded-lg transition-colors text-gray-400 hover:text-white",
  button_next: "flex items-center justify-center w-7 h-7 rounded-lg transition-colors text-gray-400 hover:text-white",
  weeks: "space-y-1",
  weekdays: "flex",
  weekday: "w-9 text-center text-xs text-gray-400 font-medium pb-1",
  week: "flex",
  day: "w-9 h-9 flex items-center justify-center relative p-0",
  outside: "text-gray-600 opacity-40",
  disabled: "opacity-20 cursor-not-allowed",
};

type DateTheme = keyof typeof THEMES;
type IconPosition = "left" | "right";
type SingleValue = string | undefined;
type RangeValue = { from?: string; to?: string } | undefined;

interface CommonProps {
  theme?: DateTheme;
  placeholder?: string;
  className?: string;
  iconPosition?: IconPosition; // Yeni prop
}

interface SingleProps extends CommonProps {
  mode: "single";
  value?: SingleValue;
  onChange: (val: SingleValue) => void;
}

interface RangeProps extends CommonProps {
  mode?: "range";
  value?: RangeValue;
  onChange: (val: RangeValue) => void;
}

export function DatePicker(props: SingleProps | RangeProps) {
  const { 
    mode = "range", 
    value, 
    onChange, 
    theme = "default", 
    placeholder = "Tarih Seçin", 
    className,
    iconPosition = "left" // Default left
  } = props;
  
  const currentTheme = THEMES[theme];
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [tempSingle, setTempSingle] = useState<Date | undefined>();
  const [tempRange, setTempRange] = useState<DateRange | undefined>();

  useEffect(() => {
    if (mode === "single" && typeof value === "string") {
      const d = parseISO(value);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTempSingle(isValid(d) ? d : undefined);
    } else if (mode === "range" && value && typeof value === "object") {
      const v = value as RangeValue;
      setTempRange({
        from: v?.from ? parseISO(v.from) : undefined,
        to: v?.to ? parseISO(v.to) : undefined
      });
    } else {
      setTempSingle(undefined);
      setTempRange(undefined);
    }
  }, [value, mode]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const getFinalClassNames = () => {
    const themeClasses = currentTheme.classNames;
    const base = { ...BASE_CLASS_NAMES, ...themeClasses };

    if (mode === "single") {
      return {
        ...base,
        range_start: "",
        range_end: "",
        range_middle: "",
        day_button: cn("w-8 h-8 rounded-lg text-sm transition-colors relative z-10 flex items-center justify-center", themeClasses.day_button)
      };
    } else {
      return {
        ...base,
        selected: "", 
        range_start: cn(themeClasses.range_start, "rounded-l-(--radius-base)"),
        range_end: cn(themeClasses.range_end, "rounded-r-(--radius-base)"),
        range_middle: cn(themeClasses.range_middle, "rounded-none"),
        day_button: cn("w-8 h-8 text-sm transition-colors relative z-10 flex items-center justify-center", themeClasses.day_button)
      };
    }
  };

  const handleApply = () => {
    if (mode === "single") {
      if (tempSingle) {
        let finalDate = tempSingle;
        if (value && typeof value === "string") {
          const oldDate = parseISO(value);
          if (isValid(oldDate)) {
            finalDate = setHours(finalDate, oldDate.getHours());
            finalDate = setMinutes(finalDate, oldDate.getMinutes());
            finalDate = setSeconds(finalDate, 0);
          }
        }
        const formatted = finalDate.toISOString();
        (onChange as (val: SingleValue) => void)(formatted);
      } else {
        (onChange as (val: SingleValue) => void)(undefined);
      }
    } else {
      const formattedRange = {
        from: tempRange?.from ? tempRange.from.toISOString() : undefined,
        to: tempRange?.to ? tempRange.to.toISOString() : undefined,
      };
      (onChange as (val: RangeValue) => void)(formattedRange);
    }
    setOpen(false);
  };

  const handleClear = () => {
    setTempSingle(undefined);
    setTempRange(undefined);
    if (mode === "single") {
      (onChange as (val: SingleValue) => void)(undefined);
    } else {
      (onChange as (val: RangeValue) => void)(undefined);
    }
    setOpen(false);
  };

  const getDisplayLabel = () => {
    if (mode === "single") {
      const dateStr = value as string | undefined;
      if (!dateStr) return placeholder;
      const d = parseISO(dateStr); // ISO string'i güvenle parse eder
      return isValid(d) ? format(d, "dd.MM.yyyy") : placeholder;
    }
    const v = value as RangeValue;
    if (!v?.from) return placeholder;
    const fromStr = format(parseISO(v.from), "dd.MM.yyyy");
    const toStr = v.to ? format(parseISO(v.to), "dd.MM.yyyy") : "...";
    return `${fromStr} - ${toStr}`;
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "h-11 w-full flex items-center px-4 text-sm rounded-xl border transition-all shadow-sm",
          iconPosition === "right" ? "flex-row-reverse justify-between" : "flex-row gap-2",
          currentTheme.button
        )}
      >
        <CalendarWeek className={cn("w-4 h-4 shrink-0", currentTheme.accentIcon)} />
        <span className="truncate">{getDisplayLabel()}</span>
      </button>

      {open && (
        <div className={cn(
          "absolute left-0 mt-2 z-50 rounded-2xl border shadow-2xl min-w-[280px]",
          currentTheme.calendar
        )}>
          {mode === "single" ? (
            <DayPicker
              mode="single"
              selected={tempSingle}
              onSelect={setTempSingle}
              locale={tr}
              classNames={getFinalClassNames()}
              components={{
                Chevron: ({ orientation }) => orientation === "left" ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />
              }}
            />
          ) : (
            <DayPicker
              mode="range"
              selected={tempRange}
              onSelect={setTempRange}
              locale={tr}
              classNames={getFinalClassNames()}
              components={{
                Chevron: ({ orientation }) => orientation === "left" ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />
              }}
            />
          )}
          <div className="flex gap-2 p-3 border-t border-gray-800/10">
            <Button text="Temizle" variant="secondary" size="full" onClick={handleClear} className="h-9 text-xs" />
            <Button text="Onayla" variant="brand" size="full" onClick={handleApply} className="h-9 text-xs" />
          </div>
        </div>
      )}
    </div>
  );
}