import { FilterGroupConfig } from "@/features/catalog/components/filters/Filters/types";
import { CatalogFilterState } from "@/features/catalog/catalog.types";

export type ActiveFilterChip = {
  key: string;
  value: string;
  label: string;
};

export function getActiveFilterLabels(
  filters: CatalogFilterState,
  groups: FilterGroupConfig[],
): ActiveFilterChip[] {
  const chips: ActiveFilterChip[] = [];

  groups.forEach((group) => {
    group.elements.forEach((el) => {
      if (el.type !== "checkbox") return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const selectedValues = (filters as any)[el.key];
      if (!Array.isArray(selectedValues) || selectedValues.length === 0)
        return;

      el.options.forEach((opt) => {
        if (selectedValues.includes(opt.value)) {
          chips.push({
            key: el.key,
            value: opt.value,
            label: opt.label,
          });
        }
      });
    });
  });

  // PRICE
  if (filters.price?.min || filters.price?.max) {
    chips.push({
      key: "price",
      value: "price",
      label: `${filters.price.min ?? 0} – ${filters.price.max ?? "∞"} ₺`,
    });
  }

  return chips;
}
