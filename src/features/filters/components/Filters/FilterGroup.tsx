"use client";
import Title from "@/components/common/Title/Title";
import FilterElement from "./FilterElement";
import { useState } from "react";
import { ChevronRight } from "flowbite-react-icons/outline";
import { FilterGroupConfig } from "../../filters.types";

interface FilterGroupProps {
  config: FilterGroupConfig;
  activeCount?: number;
  resetFilters: () => void;
  toggleFilter: (key: string, value: string) => void;
  setPriceRange: (min?: number, max?: number) => void;
  toggleBoolean: (key: string) => void;
}

export default function FilterGroup({
  config,
  activeCount,
  resetFilters,
  toggleFilter,
  setPriceRange,
  toggleBoolean,
}: FilterGroupProps) {
  const { titleData, elements } = config;

  return (
    <div className="space-y-4 border-b md:border-none py-4 md:pb-0">
      {titleData && (
        <div className="flex md:justify-start justify-between">
          <Title
            data={titleData}
            activeCount={activeCount}
            onAction={resetFilters}
            actionBtn={true}
          />
        </div>
      )}

      <div className="space-y-4 md:block">
        {elements.map((el) => (
          <FilterElement
            key={el.key}
            config={el}
            toggleFilter={toggleFilter}
            setPriceRange={setPriceRange}
            toggleBoolean={toggleBoolean}
          />
        ))}
      </div>
    </div>
  );
}
