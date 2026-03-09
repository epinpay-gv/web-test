import { FilterGroupConfig, FilterElementConfig } from "../catalog.types";

type FilterOption = { label: string; value: string };

/**
 * Belirtilen filter key için seçili option'ı döndürür.
 * Checkbox ve Dropdown tiplerini destekler.
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
      (el): el is Extract<
        FilterElementConfig,
        { type: "checkbox" | "dropdown" }
      > =>
        (el.type === "checkbox" || el.type === "dropdown") &&
        el.key === key,
    );

  if (!element?.options) return undefined;

  return element.options.find((opt) => opt.value === selectedValue);
}