import { ActiveFilterChip, FilterGroupConfig,} from "@/features/catalog/catalog.types";

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
