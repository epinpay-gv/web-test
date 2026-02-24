"use client";

import { Badge } from "@/components/common";
import { ActiveFilterChip } from "@/features/catalog/catalog.types";

type FilterKey = "category" | "region" | "platform";

interface FilterLabelsProps {
  activeFilters: ActiveFilterChip[];
  setPriceRange: (min?: number | undefined, max?: number | undefined) => void;
  toggleFilter: (key: FilterKey, value: string) => void;
  resetFilters: () => void;
}

export default function FilterLabels({
  activeFilters,
  setPriceRange,
  toggleFilter,
  resetFilters,
}: FilterLabelsProps) {
  return (
    <div className="hidden md:flex flex-wrap items-center gap-2">
      <button
        onClick={resetFilters}
        className="text-(--text-fg-brand) mr-2 cursor-pointer hover:underline"
      >
        Seçimleri Temizle
      </button>
      {activeFilters.map((chip) => (
        <Badge
          key={`${chip.key}-${chip.value}`}
          text={chip.label}
          size="lg"
          theme="gray"
          closable
          type="default"
          onClose={() => {
            if (chip.key === "price") {
              setPriceRange(undefined, undefined);
            } else {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              toggleFilter(chip.key as any, chip.value);
            }
          }}
        />
      ))}
    </div>
  );
}
