/* eslint-disable @typescript-eslint/no-unused-expressions */

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { FilterGroupConfig } from "../filters.types";

export function useUrlFilters(initialFilters: FilterGroupConfig[]) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function navigate(updater: (p: URLSearchParams) => void) {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      updater(params);
      router.replace(`?${params.toString()}`, { scroll: false });
    });
  }

  function handleTypeChange(value: string) {
    navigate((p) => {
      value === "all" ? p.delete("type") : p.set("type", value);
      p.delete("page");
    });
  }

  function handleToggleFilter(key: string, value: string) {
    navigate((p) => {
      const existing = p.getAll(key);
      p.delete(key);
      const next = existing.includes(value)
        ? existing.filter((v) => v !== value)
        : [...existing, value];
      next.forEach((v) => p.append(key, v));
      p.delete("page");
    });
  }

  function handleSetPriceRange(min?: number, max?: number) {
    navigate((p) => {
      min !== undefined ? p.set("minPrice", String(min)) : p.delete("minPrice");
      max !== undefined ? p.set("maxPrice", String(max)) : p.delete("maxPrice");
      p.delete("page");
    });
  }

  function handleToggleBoolean(key: string) {
    navigate((p) => {
      p.get(key) === "true" ? p.delete(key) : p.set(key, "true");
      p.delete("page");
    });
  }

  function handleResetFilters() {
    navigate((p) => {
      initialFilters.forEach((group) =>
        group.elements.forEach((el) => p.delete(el.key)),
      );
      p.delete("page");
    });
  }

  function handlePageChange(page: number) {
    navigate((p) => p.set("page", String(page)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSortChange(value: string) {
    navigate((p) => {
      value ? p.set("sort", value) : p.delete("sort");
      p.delete("page");
    });
  }

  function handleSearchChange(key: string, value: string) {
    navigate((p) => {
      value.trim() ? p.set(key, value.trim()) : p.delete(key);
      p.delete("page");
    });
  }

  function handleDateRangeChange(
    keyFrom: string,
    keyTo: string,
    range?: { from?: string; to?: string },
  ) {
    navigate((p) => {
      range?.from ? p.set(keyFrom, range.from) : p.delete(keyFrom);
      range?.to ? p.set(keyTo, range.to) : p.delete(keyTo);
      p.delete("page");
    });
  }

  function handleSingleFilter(key: string, value: string) {
    navigate((p) => {
      value === "all" ? p.delete(key) : p.set(key, value);
      p.delete("page");
    });
  }

  /**
   * Mobile-only: receives the entire draft URLSearchParams and
   * replaces the URL in a single navigation — no flicker, no race conditions.
   */
  function handleBulkApply(draft: URLSearchParams) {
    navigate((p) => {
      initialFilters.forEach((group) =>
        group.elements.forEach((el) => p.delete(el.key)),
      );
      p.delete("minPrice");
      p.delete("maxPrice");
      p.delete("page");

      draft.forEach((value, key) => {
        p.append(key, value);
      });
    });
  }

  return {
    searchParams,
    isPending,
    handleTypeChange,
    handleToggleFilter,
    handleSetPriceRange,
    handleToggleBoolean,
    handleResetFilters,
    handlePageChange,
    handleSortChange,
    handleSearchChange,
    handleDateRangeChange,
    handleSingleFilter,
    handleBulkApply
  };
}
