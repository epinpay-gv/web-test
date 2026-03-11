import {
  ActiveFilterChip,
  FilterElementConfig,
  FilterGroupConfig,
  FilterOption,
} from "../filters.types";

/**
 * Returns active filter count per group. Used for badge numbers on group headers.
 * Index in the returned array corresponds to the same index in `groups`.
 */
export const countActiveFiltersByGroup = (
  activeFilters: ActiveFilterChip[],
  groups: FilterGroupConfig[],
) => {
  return groups.map((group) => {
    const elementKeys = group.elements.map((el) => el.key);

    const count = activeFilters.filter((chip) =>
      elementKeys.includes(chip.key),
    ).length;

    return count;
  });
};

/**
 * Resolves a raw URL value (e.g. "1") to its full FilterOption (e.g. { value: "1", label: "PC" }).
 * Only searches checkbox/dropdown elements since those are the only types with options.
 */
export function extractSelectedFilterOption(
  filters: FilterGroupConfig[],
  key: string,
  selectedValue?: string,
): FilterOption | undefined {
  if (!selectedValue) return undefined;

  const element = filters
    .flatMap((group) => group.elements)
    .find(
      (
        el,
      ): el is Extract<
        FilterElementConfig,
        { type: "checkbox" | "dropdown" }
      > => (el.type === "checkbox" || el.type === "dropdown") && el.key === key,
    );

  if (!element?.options) return undefined;

  return element.options.find((opt) => opt.value === selectedValue);
}

/**
 * Builds the active filter chip list from current URL params.
 * Handles multi-value checkbox params via getAll(), and treats price range as a special case.
 */
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