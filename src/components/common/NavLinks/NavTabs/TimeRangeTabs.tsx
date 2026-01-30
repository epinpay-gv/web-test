"use client";

export type TimeRangeItem = {
  label: string;
  value: string;
};

interface TimeRangeTabsProps {
  items: TimeRangeItem[];
  activeValue: string;
  onChange: (value: string) => void;

  containerClassName?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  inactiveTabClassName?: string;
}

export default function TimeRangeTabs({
  items,
  activeValue,
  onChange,
  containerClassName,
  tabClassName,
  activeTabClassName,
  inactiveTabClassName,
}: TimeRangeTabsProps) {
  return (
    <div className={containerClassName}>
      {items.map((item) => {
        const isActive = item.value === activeValue;

        return (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={`
              ${tabClassName ?? ""}
              ${isActive ? activeTabClassName ?? "" : inactiveTabClassName ?? ""}
            `}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
