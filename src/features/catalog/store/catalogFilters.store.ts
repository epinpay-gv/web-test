import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CatalogFilterState } from "../catalog.types";

type FilterKey = "category" | "region" | "platform";

type CatalogFiltersStore = {
  filters: CatalogFilterState;

  toggleFilter: (key: FilterKey, value: string) => void;
  setProductType: (value: string) => void;
  setPriceRange: (min?: number, max?: number) => void;
  reset: () => void;
};

const initialFilters: CatalogFilterState = {
  category: [],
  region: [],
  platform: [],
  productType: [],
  price: undefined,
};

export const useCatalogFilters = create<CatalogFiltersStore>()(
  devtools((set) => ({
    filters: initialFilters,

    toggleFilter: (key, value) =>
      set((state) => {
        const current = state.filters[key];
        const exists = current.includes(value);
        return {
          filters: {
            ...state.filters,
            [key]: exists
              ? current.filter((v) => v !== value)
              : [...current, value],
          },
        };
      }),

    // TAB → single select
    setProductType: (value) =>
      set((state) => ({
        filters: {
          ...state.filters,
          productType: [value],
        },
      })),

    setPriceRange: (min, max) =>
      set((state) => ({
        filters: {
          ...state.filters,
          price: { min, max },
        },
      })),

    reset: () => set({ filters: initialFilters }),
  })),
);
