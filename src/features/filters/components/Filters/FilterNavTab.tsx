"use client";
import {  NavTab } from "@/components/common";
import { FilterGroupConfig } from "@/features/filters/filters.types";
import { useUrlFilters } from "@/features/filters/hooks/useUrlFilters";

interface FilterNavTabProps {
  initialFilters: FilterGroupConfig[];
}

export default function FilterNavTab({
  initialFilters,
}: FilterNavTabProps) {
  const {
    searchParams,
    handleTypeChange,
  } = useUrlFilters(initialFilters);

  const tabFilters = initialFilters.find((g) => g.isTab);

  const productTypeTabItems =
    tabFilters?.elements?.[0]?.type === "checkbox"
      ? tabFilters.elements[0].options.map((opt) => ({
          label: opt.label,
          value: opt.value,
        }))
      : [];

  const activeType = searchParams.get("type") ?? "all";

  return (
    <div className="pl-4 md:pl-0 py-4 md:py-6 w-full">
      {productTypeTabItems.length > 0 && (
        <NavTab
          items={productTypeTabItems}
          activeValue={activeType}
          variant="segmented"
          size="base"
          onChange={handleTypeChange}
        />
      )}
    </div>
  );
}
