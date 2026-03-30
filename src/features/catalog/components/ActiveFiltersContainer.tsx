"use client";
import { FilterLabels } from "@/features/catalog/components";
import { FilterGroupConfig } from "@/features/filters/filters.types";
import { getActiveFilterLabels } from "@/features/filters/utils/filters.utils";
import { useUrlFilters } from "@/features/filters/hooks/useUrlFilters";

interface ActiveFiltersContainerProps {
  initialFilters: FilterGroupConfig[];
}

export default function ActiveFiltersContainer({
  initialFilters,
}: ActiveFiltersContainerProps) {
  const { searchParams } = useUrlFilters(initialFilters);

  const activeFilters = getActiveFilterLabels(
    new URLSearchParams(searchParams.toString()),
    initialFilters,
  );

  return (
    <div>
      {activeFilters.length > 0 && (
        <FilterLabels initialFilters={initialFilters} />
      )}
    </div>
  );
}
