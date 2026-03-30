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
import { useUrlFilters } from "../../hooks/useUrlFilters";

interface FilterContainerProps {
  initialFilters: FilterGroupConfig[];
}

export default function FilterContainer({
  initialFilters,
}: FilterContainerProps) {
  const t = useTranslations("catalog.filters");

  const {
    searchParams,
    isPending,
    handleTypeChange,
    handleToggleFilter,
    handleSetPriceRange,
    handleToggleBoolean,
    handleResetFilters,
    handlePageChange,
    handleSortChange,
    handleBulkApply,
  } = useUrlFilters(initialFilters);

  const filters = initialFilters.filter((g) => !g.isTab && !g.isTitle);
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
  } = useMobileFilterSheet({
    filters,
    searchParams,
    onBulkApply: handleBulkApply,
  });
  const activeFilters = getActiveFilterLabels(
    new URLSearchParams(searchParams.toString()),
    initialFilters,
  );
  const activeCountMap = countActiveFiltersByGroup(activeFilters, filters);
  const titleFilters = initialFilters.find((g) => g.isTitle);

  // SORT IN TITLE
  const dropdownEl = titleFilters?.elements.find(
    (el) => el.type === "dropdown",
  );
  const dropdownItems =
    dropdownEl?.type === "dropdown"
      ? dropdownEl.options.map((opt) => ({
          id: opt.value,
          text: opt.label,
          value: opt.value,
        }))
      : [];
  const defaultSort =
    dropdownEl?.type === "dropdown" ? (dropdownEl.options[0]?.value ?? "") : "";
  const currentSort = searchParams.get("sort") ?? defaultSort;

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
          onSelect={handleSortChange}
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
        <Title data={{ title: "Filtrele", isUnderlined: true }} />
        {filters.map((group, index) => (
          <FilterGroup
            key={index}
            config={group}
            activeCount={activeCountMap[index]}
            resetFilters={handleResetFilters}
            toggleFilter={handleToggleFilter}
            setPriceRange={handleSetPriceRange}
            toggleBoolean={handleToggleBoolean}
          />
        ))}
      </div>
    </>
  );
}
