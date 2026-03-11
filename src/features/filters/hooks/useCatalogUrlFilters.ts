/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { FilterGroupConfig } from "../filters.types";

export function useCatalogUrlFilters(initialFilters: FilterGroupConfig[]) {
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

  function handleProductTypeChange(value: string) {
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

  return {
    searchParams,
    isPending,
    handleProductTypeChange,
    handleToggleFilter,
    handleSetPriceRange,
    handleToggleBoolean,
    handleResetFilters,
    handlePageChange,
    handleSortChange,
  };
}