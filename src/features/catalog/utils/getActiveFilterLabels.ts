import {
  ActiveFilterChip,
  FilterGroupConfig,
  CatalogSearchParams,
} from "@/features/catalog/catalog.types";

export function getActiveFilterLabels(
  search: CatalogSearchParams,
  groups: FilterGroupConfig[],
): ActiveFilterChip[] {
  const chips: ActiveFilterChip[] = [];

  groups.forEach((group) => {
    group.elements.forEach((el) => {
      if (el.type !== "checkbox") return;

      const value = search[el.key as keyof CatalogSearchParams];
      if (!value) return;

      el.options.forEach((opt) => {
        if (opt.value === value) {
          chips.push({ key: el.key, value: opt.value, label: opt.label });
        }
      });
    });
  });

  if (search.minPrice || search.maxPrice) {
    chips.push({
      key: "price",
      value: "price",
      label: `${search.minPrice ?? 0} – ${search.maxPrice ?? "∞"} ₺`,
    });
  }

  return chips;
}
