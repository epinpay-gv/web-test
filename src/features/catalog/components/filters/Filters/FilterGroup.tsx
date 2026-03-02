"use client";
import Title from "@/components/common/Title/Title";
import FilterElement from "./FilterElement";
import { useState } from "react";
import { ChevronRight } from "flowbite-react-icons/outline";
import {
  CatalogSearchParams,
  FilterGroupConfig,
} from "@/features/catalog/catalog.types";

interface FilterGroupProps {
  config: FilterGroupConfig;
  activeCount?: number;
  resetFilters: () => void;
  currentSearch: CatalogSearchParams;
  toggleFilter: (key: keyof CatalogSearchParams, value: string) => void;
  setPriceRange: (min?: number, max?: number) => void;
  toggleBoolean: (key: "inTr" | "inStock") => void;
}

export default function FilterGroup({
  config,
  activeCount,
  resetFilters,
  currentSearch,
  toggleFilter,
  setPriceRange,
  toggleBoolean,
}: FilterGroupProps) {
  const { titleData, elements } = config;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4 border-b md:border-none py-4 md:pb-0">
      {titleData && (
        <div
          className="flex md:justify-start justify-between"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Title
            data={titleData}
            activeCount={activeCount}
            onAction={resetFilters}
            actionBtn={true}
          />
          <ChevronRight
            size={18}
            className={`
              md:hidden transition-transform duration-200
              ${isOpen ? "rotate-90" : ""}
            `}
          />
        </div>
      )}

      <div
        className={`
          space-y-4
          ${!titleData || isOpen ? "block" : "hidden"}
          md:block
        `}
      >
        {elements.map((el) => (
          <FilterElement
            key={el.key}
            config={el}
            currentSearch={currentSearch}
            toggleFilter={toggleFilter}
            setPriceRange={setPriceRange}
            toggleBoolean={toggleBoolean}
          />
        ))}
      </div>
    </div>
  );
}
