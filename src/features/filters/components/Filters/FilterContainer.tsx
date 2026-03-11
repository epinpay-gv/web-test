"use client";
import Title from "@/components/common/Title/Title";
import { TitleData } from "@/components/common/Title/types";
import FilterGroup from "./FilterGroup";
import { BottomSheet, Button } from "@/components/common";
import { useState } from "react";
import { Sort, Filter } from "flowbite-react-icons/outline";
import { useTranslations } from "next-intl";
import FilterDropdownContainer from "./FilterDropdownContainer";
import { ActiveFilterChip, FilterGroupConfig } from "../../filters.types";
import { countActiveFiltersByGroup } from "../../utils/filters.utils";

interface FiltersProps {
  titleData: TitleData;
  filters: FilterGroupConfig[];
  activeFilters: ActiveFilterChip[];
  resetFilters: () => void;
  toggleFilter: (key: string, value: string) => void;
  setPriceRange: (min?: number, max?: number) => void;
  toggleBoolean: (key: string) => void;
  titleFilter?: FilterGroupConfig;
  onSortSelect: (value: string) => void;
  currentSort?: string;
}

export default function Filters({
  titleData,
  filters,
  activeFilters,
  resetFilters,
  toggleFilter,
  setPriceRange,
  toggleBoolean,
  titleFilter,
  onSortSelect,
  currentSort,
}: FiltersProps) {
  const activeCountMap = countActiveFiltersByGroup(activeFilters, filters);

  const [mobileFilters, setMobileFilters] = useState(false);
  const t = useTranslations("catalog.filters");

  const dropdownEl = titleFilter?.elements.find((el) => el.type === "dropdown");
  const dropdownItems =
    dropdownEl?.type === "dropdown"
      ? dropdownEl.options.map((opt) => ({
          id: opt.value,
          text: opt.label,
          value: opt.value,
        }))
      : [];

  return (
    <>
      {/* MOBİL GÖRÜNÜM */}
      <div className="grid grid-cols-2 md:hidden gap-4 justify-between w-full">
        <Button
          padding="sm"
          textSize="sm"
          text={t("title")}
          variant="secondary"
          onClick={() => setMobileFilters(true)}
          icon={<Filter size={14} />}
        />
        <FilterDropdownContainer
          selectedId={currentSort ?? ""}
          items={dropdownItems}
          onSelect={onSortSelect}
          icon={<Sort size={16} className="text-(--text-body)" />}
        />
        <BottomSheet
          isOpen={mobileFilters}
          title={t("title")}
          onClose={() => setMobileFilters(false)}
        >
          <div className="p-6">
            {filters.map((group, index) => (
              <FilterGroup
                key={index}
                config={group}
                activeCount={activeCountMap[index]}
                resetFilters={resetFilters}
                toggleFilter={toggleFilter}
                setPriceRange={setPriceRange}
                toggleBoolean={toggleBoolean}
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
            toggleFilter={toggleFilter}
            setPriceRange={setPriceRange}
            toggleBoolean={toggleBoolean}
          />
        ))}
      </div>
    </>
  );
}
