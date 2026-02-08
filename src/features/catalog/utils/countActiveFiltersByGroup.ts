import { ActiveFilterChip } from "@/features/catalog/utils/getActiveFilterLabels";
import { FilterGroupConfig } from "../components/filters/Filters/types";

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