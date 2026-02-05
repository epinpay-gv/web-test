import { create } from "zustand";

export type CatalogFilters = {
  category?: string[];
  region?: string[];
  platform?: string[];
  minPrice?: number;
  maxPrice?: number;

  setCheckboxFilter: (key: "category" | "region" | "platform", value: string) => void;
  setRange: (min?: number, max?: number) => void;
  reset: () => void;
};

export const useCatalogFilters = create<CatalogFilters>((set) => ({
  category: [],
  region: [],
  platform: [],
  minPrice: undefined,
  maxPrice: undefined,

  setCheckboxFilter: (key, value) =>
    set((state) => {
      const current = state[key] ?? [];
      const exists = current.includes(value);

      return {
        ...state,
        [key]: exists
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    }),

  setRange: (min, max) =>
    set((state) => ({
      ...state,
      minPrice: min,
      maxPrice: max,
    })),

  reset: () =>
    set({
      category: [],
      region: [],
      platform: [],
      minPrice: undefined,
      maxPrice: undefined,
    }),
}));
