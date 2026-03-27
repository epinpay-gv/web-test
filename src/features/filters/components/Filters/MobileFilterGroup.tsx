"use client";
import { ChevronRight } from "flowbite-react-icons/outline";
import { ActiveFilterChip, FilterGroupConfig } from "../../filters.types";
import FilterElement from "./FilterElement";

interface MobileFilterGroupProps {
  filters: FilterGroupConfig[];
  draftActiveFilters: ActiveFilterChip[];
  onSelectGroup: (group: FilterGroupConfig) => void;
  draft: URLSearchParams;
  toggleFilter: (key: string, value: string) => void;
  setPriceRange: (min?: number, max?: number) => void;
  toggleBoolean: (key: string) => void;
}

export default function MobileFilterGroup({
  filters,
  draftActiveFilters,
  onSelectGroup,
  draft,
  toggleFilter,
  setPriceRange,
  toggleBoolean,
}: MobileFilterGroupProps) {
  return (
    <ul className="divide-y divide-(--border-default) px-4">
      {filters.map((group, index) => {
        if (!group.titleData) {
          return (
            <li key={index} className="px-6 pt-4 pb-8 space-y-4">
              {group.elements.map((el) => (
                <FilterElement
                  key={el.key}
                  config={el}
                  toggleFilter={toggleFilter}
                  setPriceRange={setPriceRange}
                  toggleBoolean={toggleBoolean}
                  searchParamsOverride={draft}
                />
              ))}
            </li>
          );
        }

        const groupKeys = new Set(group.elements.map((el) => el.key));
        const groupLabels = draftActiveFilters
          .filter((chip) => groupKeys.has(chip.key))
          .map((chip) => chip.label);

        return (
          <li key={index}>
            <button
              className="w-full flex items-center justify-between px-6 pt-4 pb-8 text-left gap-4"
              onClick={() => onSelectGroup(group)}
            >
              <div className="flex flex-col gap-1 min-w-0">
                <span className="font-semibold text-sm text-(--text-heading)">
                  {group.titleData.title}
                </span>

                {groupLabels.length > 0 && (
                  <span className="text-xs text-(--text-body) truncate">
                    {groupLabels.join(", ")}
                  </span>
                )}
              </div>

              <ChevronRight size={18} className="shrink-0 text-(--text-body)" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}