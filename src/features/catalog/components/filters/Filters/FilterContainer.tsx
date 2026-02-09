"use client";
import Title from "@/components/common/Title/Title";
import { TitleData } from "@/components/common/Title/types";
import { FilterGroupConfig } from "./types";
import FilterGroup from "./FilterGroup";
import { ActiveFilterChip } from "@/features/catalog/utils/getActiveFilterLabels";
import { countActiveFiltersByGroup } from "@/features/catalog/utils";

interface FiltersProps {
  titleData: TitleData;
  filters: FilterGroupConfig[];
  activeFilters: ActiveFilterChip[]
  resetFilters: () => void;
}

export default function Filters({ titleData, filters, activeFilters, resetFilters }: FiltersProps) {
  const activeCountMap = countActiveFiltersByGroup(activeFilters, filters);

  return (
    <>
      <div className="blue-container container max-w-77 p-6 space-y-4">
        <Title data={titleData}/>
        {filters.map((group, index) => (
          <FilterGroup key={index} config={group} activeCount={activeCountMap[index]} resetFilters={resetFilters}/>
        ))}
      </div>
    </>
  );
}
