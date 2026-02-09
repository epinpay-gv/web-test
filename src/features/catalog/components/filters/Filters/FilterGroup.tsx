"use client";
import Title from "@/components/common/Title/Title";
import { FilterGroupConfig } from "./types";
import FilterElement from "./FilterElement";

interface FilterGroupProps {
  config: FilterGroupConfig;
  activeCount?: number;
  resetFilters: () => void;
}

export default function FilterGroup({ config, activeCount, resetFilters }: FilterGroupProps) {
  const { titleData, elements } = config;

  return (
    <div className="space-y-4">
      {titleData && <Title data={titleData} activeCount={activeCount} onAction={resetFilters} actionBtn={true}/>}

      <div className="space-y-4">
        {elements.map((el) => (
          <FilterElement key={el.key} config={el} />
        ))}
      </div>
    </div>
  );
}
