"use client";
import FilterElement from "./FilterElement";
import { FilterGroupConfig } from "../../filters.types";

interface MobileFilterElementProps {
  config: FilterGroupConfig;
  draft: URLSearchParams;
  toggleFilter: (key: string, value: string) => void;
  setPriceRange: (min?: number, max?: number) => void;
  toggleBoolean: (key: string) => void;
}


export default function MobileFilterElement({
  config,
  draft,
  toggleFilter,
  setPriceRange,
  toggleBoolean,
}: MobileFilterElementProps) {
  return (
    <div className="p-6 space-y-4">
      {config.elements.map((el) => (
        <FilterElement
          key={el.key}
          config={el}
          toggleFilter={toggleFilter}
          setPriceRange={setPriceRange}
          toggleBoolean={toggleBoolean}
          searchParamsOverride={draft}
        />
      ))}
    </div>
  );
}