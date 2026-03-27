"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { FilterGroupConfig } from "../filters.types";

/**
 * Encodes a string array into bracket notation.
 * ["1", "2", "3"] → "[1,2,3]"
 */
export function encodeArray(values: string[]): string {
  return `[${values.join(",")}]`;
}

/**
 * Decodes bracket notation back into a string array.
 * "[1,2,3]" → ["1", "2", "3"]
 * "1"       → ["1"]  
 */
export function decodeArray(raw: string | null): string[] {
  if (!raw) return [];
  const trimmed = raw.trim();
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    const inner = trimmed.slice(1, -1);
    return inner === "" ? [] : inner.split(",").map((v) => v.trim());
  }
  return [trimmed];
}

/**
 * Read all values for a key from params using bracket format.
 * Replaces URLSearchParams.getAll() for filter keys.
 */
export function getArrayParam(p: URLSearchParams, key: string): string[] {
  return decodeArray(p.get(key));
}

/**
 * Write an array to params using bracket format.
 * Deletes the key if the array is empty.
 */
export function setArrayParam(p: URLSearchParams, key: string, values: string[]): void {
  if (values.length === 0) {
    p.delete(key);
  } else {
    p.set(key, encodeArray(values));
  }
}

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
      const existing = getArrayParam(p, key);
      const next = existing.includes(value)
        ? existing.filter((v) => v !== value)
        : [...existing, value];
      setArrayParam(p, key, next);
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

  function handleBulkApply(draft: URLSearchParams) {
    navigate((p) => {
      initialFilters.forEach((group) =>
        group.elements.forEach((el) => p.delete(el.key)),
      );
      p.delete("minPrice");
      p.delete("maxPrice");
      p.delete("page");

      // p.set not p.append — each key is already a single bracket-encoded string
      draft.forEach((value, key) => {
        p.set(key, value);
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
    handleBulkApply,
  };
}