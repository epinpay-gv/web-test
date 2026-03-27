import { useState, useCallback } from "react";
import { FilterGroupConfig } from "../filters.types";
import { getActiveFilterLabels } from "../utils/filters.utils";

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
      const existing = next.getAll(key);
      next.delete(key);
      const updated = existing.includes(value)
        ? existing.filter((v) => v !== value)
        : [...existing, value];
      updated.forEach((v) => next.append(key, v));
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
    // Snapshot current URL into draft so already-applied filters are pre-checked
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
    // Wipe only filter-owned keys; keep sort/type in draft
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

  // Active labels derived from draft — shown under group titles on Page 1
  const draftActiveFilters = getActiveFilterLabels(draft, filters);

  const sheetTitle = selectedGroup?.titleData?.title ?? "Filtrele";

  return {
    // State
    sheetOpen,
    selectedGroup,
    draft,
    draftActiveFilters,
    sheetTitle,
    // Setters
    setSelectedGroup,
    // Handlers
    handleOpen,
    handleClose,
    handleApply,
    handleReset,
    draftToggleFilter,
    draftSetPriceRange,
    draftToggleBoolean,
  };
}