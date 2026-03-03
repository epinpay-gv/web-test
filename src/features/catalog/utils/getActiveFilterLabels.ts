import {
  ActiveFilterChip,
  FilterGroupConfig,
} from "@/features/catalog/catalog.types";

export function getActiveFilterLabels(
  params: URLSearchParams,
  groups: FilterGroupConfig[],
): ActiveFilterChip[] {
  const chips: ActiveFilterChip[] = [];

  groups.forEach((group) => {
    group.elements.forEach((el) => {
      if (el.type !== "checkbox") return;

      // getAll handles ?region=1&region=2 → ["1", "2"] correctly
      const selectedValues = params.getAll(el.key);
      if (selectedValues.length === 0) return;

      el.options.forEach((opt) => {
        if (selectedValues.includes(opt.value)) {
          chips.push({ key: el.key, value: opt.value, label: opt.label });
        }
      });
    });
  });

  const minPrice = params.get("minPrice");
  const maxPrice = params.get("maxPrice");
  if (minPrice || maxPrice) {
    chips.push({
      key: "price",
      value: "price",
      label: `${minPrice ?? 0} – ${maxPrice ?? "∞"} ₺`,
    });
  }

  return chips;
}