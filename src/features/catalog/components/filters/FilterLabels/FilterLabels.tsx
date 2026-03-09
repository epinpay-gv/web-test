"use client";

import { Badge } from "@/components/common";
import { ActiveFilterChip } from "@/features/catalog/catalog.types";
import { useTranslations } from "next-intl";

interface FilterLabelsProps {
  isLoading?: boolean;
  activeFilters: ActiveFilterChip[];
  setPriceRange: (min?: number, max?: number) => void;
  toggleFilter: (key: string, value: string) => void;
  resetFilters: () => void;
}

export default function FilterLabels({
  isLoading = false,
  activeFilters,
  setPriceRange,
  toggleFilter,
  resetFilters,
}: FilterLabelsProps) {
  const t = useTranslations("catalog.filters");
  const activeFilterCount = activeFilters.length;

  if (isLoading) {
    return (
      <div className="hidden md:flex flex-wrap items-center gap-2">
        {/* Clear selections */}
        <div className="h-4 w-24 rounded bg-gray-200 shimmer mr-2" />

        {/* Filter chips */}
        {Array.from({ length: activeFilterCount }).map((_, i) => (
          <div key={i} className="h-7 w-26 rounded-lg bg-gray-200 shimmer" />
        ))}
      </div>
    );
  }

  return (
    <div className="hidden md:flex flex-wrap items-center gap-2">
      <button
        onClick={resetFilters}
        className="text-(--text-fg-brand) mr-2 cursor-pointer hover:underline"
      >
        {t("clearSelections")}
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
