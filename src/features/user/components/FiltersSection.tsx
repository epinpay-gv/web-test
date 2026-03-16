"use client";

import UserPageSearch from "./UserPageSearch";
import Badge from "@/components/common/Badges/Badge";
import { DatePicker } from "@/components/common/Calendar/DateRangePicker";
import { FilterGroupConfig } from "@/features/filters/filters.types";

interface FiltersSectionProps {
  filters: FilterGroupConfig[];
  searchParams: URLSearchParams;
  onSearchChange: (key: string, value: string) => void;
  onStatusChange: (key: string, value: string) => void;
  onDateRangeChange: (
    keyFrom: string,
    keyTo: string,
    range?: { from?: string; to?: string },
  ) => void;
  totalCount?: number;
  isSearchAndDate?: boolean;
}

export default function FiltersSection({
  filters,
  searchParams,
  onSearchChange,
  onStatusChange,
  onDateRangeChange,
  totalCount,
  isSearchAndDate = false,
}: FiltersSectionProps) {
  // ─── Derive config from filters prop (no more manual searchParams.get in parent) ───

  const searchEl = filters
    .flatMap((g) => g.elements)
    .find((el) => el.type === "input");

  const statusEl = filters
    .find((g) => g.isTab)
    ?.elements.find((el) => el.type === "checkbox");

  const dateEl = filters
    .flatMap((g) => g.elements)
    .find((el) => el.type === "dateRange");

  // ─── Read active values from URL ────────────────────────────────────────

  const searchValue = searchEl ? (searchParams.get(searchEl.key) ?? "") : "";

  const activeStatus = statusEl
    ? (searchParams.get(statusEl.key) ?? "all")
    : "all";

  const dateFrom =
    dateEl?.type === "dateRange"
      ? (searchParams.get(dateEl.keyFrom) ?? undefined)
      : undefined;
  const dateTo =
    dateEl?.type === "dateRange"
      ? (searchParams.get(dateEl.keyTo) ?? undefined)
      : undefined;
  const dateValue =
    dateFrom || dateTo ? { from: dateFrom, to: dateTo } : undefined;

  // ─── Handlers scoped to config keys ─────────────────────────────────────

  const handleDateChange = (range?: { from?: string; to?: string }) => {
    if (dateEl?.type === "dateRange") {
      onDateRangeChange(dateEl.keyFrom, dateEl.keyTo, range);
    }
  };

  return (
    <div className="flex flex-col gap-3 mb-4">
      {/* Desktop row */}
      <div className="hidden sm:flex sm:flex-row sm:items-center gap-2">
        {typeof totalCount === "number" && (
          <span className="text-xs md:text-sm text-(--text-body) sm:mr-auto">
            {totalCount} sipariş listeleniyor
          </span>
        )}
        {isSearchAndDate && searchEl && (
          <UserPageSearch
            value={searchValue}
            onChange={(val) => onSearchChange(searchEl.key, val)}
          />
        )}
        {isSearchAndDate && dateEl && (
          <DatePicker value={dateValue} onChange={handleDateChange} />
        )}
      </div>

      {/* Mobile row */}
      <div className="flex sm:hidden flex-row items-center gap-2">
        {isSearchAndDate && searchEl && (
          <div className="flex-1 min-w-0">
            <UserPageSearch
              value={searchValue}
              onChange={(val) => onSearchChange(searchEl.key, val)}
            />
          </div>
        )}
        {isSearchAndDate && dateEl && (
          <DatePicker value={dateValue} onChange={handleDateChange} />
        )}
      </div>

      {/* Status tabs */}
      {statusEl?.type === "checkbox" && (
        <div className="flex items-center gap-1 md:gap-2 flex-wrap">
          {statusEl.options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onStatusChange(statusEl.key, opt.value)}
              className="focus:outline-none"
            >
              <Badge
                text={opt.label} 
                size="sm"
                theme={activeStatus === opt.value ? "brand" : "white"}
                type="pill"
                className="rounded-sm cursor-pointer"
              />
            </button>
          ))}
        </div>
      )}

      {typeof totalCount === "number" && (
        <span className="sm:hidden text-xs text-(--text-body)">
          {totalCount} sipariş listeleniyor
        </span>
      )}
    </div>
  );
}
