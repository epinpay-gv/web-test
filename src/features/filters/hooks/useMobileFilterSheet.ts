import { useState, useCallback } from "react";
import { FilterGroupConfig } from "../filters.types";
import { getActiveFilterLabels } from "../utils/filters.utils";
import { getArrayParam, encodeArray } from "./useUrlFilters";

interface UseMobileFilterSheetProps {
  filters: FilterGroupConfig[];
  searchParams: URLSearchParams;
  onBulkApply: (draft: URLSearchParams) => void;
}

export function useMobileFilterSheet({
  filters,
  searchParams,
  onBulkApply,
}: UseMobileFilterSheetProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<FilterGroupConfig | null>(null);
  const [draft, setDraft] = useState<URLSearchParams>(new URLSearchParams());

  // ── Draft mutators ────────────────────────────────────────────────────────

  const draftToggleFilter = useCallback((key: string, value: string) => {
    setDraft((prev) => {
      const next = new URLSearchParams(prev.toString());
      const existing = getArrayParam(next, key);
      const updated = existing.includes(value)
        ? existing.filter((v) => v !== value)
        : [...existing, value];
      // Write back in bracket format
      updated.length === 0
        ? next.delete(key)
        : next.set(key, encodeArray(updated));
      return next;
    });
  }, []);

  const draftSetPriceRange = useCallback((min?: number, max?: number) => {
    setDraft((prev) => {
      const next = new URLSearchParams(prev.toString());
      min !== undefined ? next.set("minPrice", String(min)) : next.delete("minPrice");
      max !== undefined ? next.set("maxPrice", String(max)) : next.delete("maxPrice");
      return next;
    });
  }, []);

  const draftToggleBoolean = useCallback((key: string) => {
    setDraft((prev) => {
      const next = new URLSearchParams(prev.toString());
      next.get(key) === "true" ? next.delete(key) : next.set(key, "true");
      return next;
    });
  }, []);

  // ── Sheet lifecycle ───────────────────────────────────────────────────────

  const handleOpen = () => {
    setDraft(new URLSearchParams(searchParams.toString()));
    setSelectedGroup(null);
    setSheetOpen(true);
  };

  const handleClose = () => {
    setSheetOpen(false);
    setSelectedGroup(null);
  };

  const handleApply = () => {
    onBulkApply(draft);
    handleClose();
  };

  const handleReset = () => {
    setDraft((prev) => {
      const next = new URLSearchParams(prev.toString());
      filters.forEach((group) =>
        group.elements.forEach((el) => next.delete(el.key)),
      );
      next.delete("minPrice");
      next.delete("maxPrice");
      return next;
    });
  };

  // ── Derived ───────────────────────────────────────────────────────────────

  const draftActiveFilters = getActiveFilterLabels(draft, filters);
  const sheetTitle = selectedGroup?.titleData?.title ?? "Filtrele";

  return {
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
  };
}