"use client";
import Title from "@/components/common/Title/Title";
import { TitleData } from "@/components/common/Title/types";
import FilterGroup from "./FilterGroup";
import { BottomSheet, Button } from "@/components/common";
import { useCallback, useState } from "react";
import { Sort, Filter } from "flowbite-react-icons/outline";
import { useTranslations } from "next-intl";
import FilterDropdownContainer from "./FilterDropdownContainer";
import { ActiveFilterChip, FilterGroupConfig } from "../../filters.types";
import {
  countActiveFiltersByGroup,
  getActiveFilterLabels,
} from "../../utils/filters.utils";
import MobileFilterElement from "./MobileFilterElement";
import MobileFilterGroup from "./MobileFilterGroup";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useMobileFilterSheet } from "../../hooks/useMobileFilterSheet";

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
  onBulkApply(draft: URLSearchParams): void;
  searchParams: ReadonlyURLSearchParams;
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
  onBulkApply,
  searchParams,
}: FiltersProps) {
  const activeCountMap = countActiveFiltersByGroup(activeFilters, filters);
  const t = useTranslations("catalog.filters");

  const {
    sheetOpen,
    selectedGroup,
    draft,
    draftActiveFilters,
    sheetTitle,
    setSelectedGroup,
    handleOpen,
    handleClose,
    handleApply,
    handleReset,
    draftToggleFilter,
    draftSetPriceRange,
    draftToggleBoolean,
  } = useMobileFilterSheet({ filters, searchParams, onBulkApply });

  // SORT IN TITLE
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
          text={
            <div>
              {t("title")}{" "}
              {draftActiveFilters.length > 0 && (
                <span className="ml-2 bg-(--bg-brand-softer) border border-(--border-brand-subtle) py-0.5 px-2 rounded-sm">
                  {draftActiveFilters.length}
                </span>
              )}
            </div>
          }
          variant="secondary"
          onClick={handleOpen}
          iconLeft={<Filter size={14} />}
        />

        <FilterDropdownContainer
          selectedId={currentSort ?? ""}
          items={dropdownItems}
          onSelect={onSortSelect}
          icon={<Sort size={16} className="text-(--text-body)" />}
        />
        <BottomSheet
          isOpen={sheetOpen}
          title={sheetTitle}
          onClose={handleClose}
          onBack={selectedGroup ? () => setSelectedGroup(null) : undefined}
          confirmText="Uygula"
          cancelText="Tümünü Temizle"
          onConfirm={handleApply}
          onCancel={handleReset}
          theme="dark"
        >
          {selectedGroup ? (
            <MobileFilterElement
              config={selectedGroup}
              draft={draft}
              toggleFilter={draftToggleFilter}
              setPriceRange={draftSetPriceRange}
              toggleBoolean={draftToggleBoolean}
            />
          ) : (
            <MobileFilterGroup
              filters={filters}
              draftActiveFilters={draftActiveFilters}
              onSelectGroup={setSelectedGroup}
              draft={draft}
              toggleFilter={draftToggleFilter}
              setPriceRange={draftSetPriceRange}
              toggleBoolean={draftToggleBoolean}
            />
          )}
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
