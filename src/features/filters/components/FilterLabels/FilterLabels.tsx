"use client";
import { Badge } from "@/components/common";
import { useTranslations } from "next-intl";
import { FilterGroupConfig } from "../../filters.types";
import { getActiveFilterLabels } from "../../utils/filters.utils";
import { useUrlFilters } from "../../hooks/useUrlFilters";

interface FilterLabelsProps {
  initialFilters: FilterGroupConfig[];
}

export default function FilterLabels({ initialFilters }: FilterLabelsProps) {
  const t = useTranslations("catalog.filters");
  const {
    searchParams,
    isPending,
    handleResetFilters,
    handleToggleFilter,
    handleSetPriceRange,
  } = useUrlFilters(initialFilters);

  const activeFilters = getActiveFilterLabels(
    new URLSearchParams(searchParams.toString()),
    initialFilters,
  );
  const activeFilterCount = activeFilters.length;

  if (isPending) {
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
        onClick={handleResetFilters}
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
              handleSetPriceRange(undefined, undefined);
            } else {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              handleToggleFilter(chip.key as any, chip.value);
            }
          }}
        />
      ))}
    </div>
  );
}
