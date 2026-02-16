"use client";
import Title from "@/components/common/Title/Title";
import { TitleData } from "@/components/common/Title/types";
import { FilterGroupConfig } from "./types";
import FilterGroup from "./FilterGroup";
import { ActiveFilterChip } from "@/features/catalog/utils/getActiveFilterLabels";
import { countActiveFiltersByGroup } from "@/features/catalog/utils";
import { BottomSheet, Button } from "@/components/common";
import { useState } from "react";
import { Sort, Filter } from "flowbite-react-icons/outline";

interface FiltersProps {
  titleData: TitleData;
  filters: FilterGroupConfig[];
  activeFilters: ActiveFilterChip[];
  resetFilters: () => void;
}

export default function Filters({
  titleData,
  filters,
  activeFilters,
  resetFilters,
}: FiltersProps) {
  const activeCountMap = countActiveFiltersByGroup(activeFilters, filters);

  const [mobileFilters, setMobileFilters] = useState(false);
  const [mobileSorting, setMobileSorting] = useState(false);

  return (
    <>
      {/* MOBİL GÖRÜNÜM */}
      <div className="flex md:hidden gap-4 justify-between w-full">
        <Button
          padding="sm"
          textSize="sm"
          text="Filtrele"
          variant="secondary"
          onClick={() => setMobileFilters(true)}
          icon={<Filter size={14} />}
        />
        <Button
          padding="sm"
          textSize="sm"
          text={`Sırala`}
          variant="secondary"
          onClick={() => setMobileSorting(true)}
          icon={<Sort size={14} />}
        />
        <BottomSheet
          isOpen={mobileFilters}
          title="Filtrele"
          onClose={() => setMobileFilters(false)}
        >
          <div className="p-6">
            {filters.map((group, index) => (
              <FilterGroup
                key={index}
                config={group}
                activeCount={activeCountMap[index]}
                resetFilters={resetFilters}
              />
            ))}
          </div>
        </BottomSheet>
        <BottomSheet
          isOpen={mobileSorting}
          title="Sırala"
          onClose={() => setMobileSorting(false)}
        >
          <div className="p-6">
            {filters.map((group, index) => (
              <FilterGroup
                key={index}
                config={group}
                activeCount={activeCountMap[index]}
                resetFilters={resetFilters}
              />
            ))}
          </div>
        </BottomSheet>
      </div>
      {/* WEB GÖRÜNÜM */}
      <div className="hidden md:block blue-container container max-w-77 p-6 space-y-4">
        <Title data={titleData} />
        {filters.map((group, index) => (
          <FilterGroup
            key={index}
            config={group}
            activeCount={activeCountMap[index]}
            resetFilters={resetFilters}
          />
        ))}
      </div>
    </>
  );
}
