import { Product, PaginationData, Category } from "@/types/types";
import { TitleData } from "@/components/common/Title/types";

/* CATEGORY TYPES */
export interface CategoriesPageResponse {
  data: Category[];
  pagination: PaginationData;
}

export type CatalogFilterState = {
  category: string[];
  region: string[];
  platform: string[];
  productType: string[]; // TAB + checkbox ortak
  price?: { min?: number; max?: number };
  inTr?: boolean;
  inStock?: boolean;
};

/* FILTER TYPES */

export type FilterElementConfig =
  | {
      type: "dropdown";
      key: string;
      label?: string;
      options: { label: string; value: string }[];
      search?: {
        placeholder?: string;
      };
    }
  | {
      type: "toggle";
      key: string;
      label: string;
    }
  | {
      type: "input";
      key: string;
      label: string;
      placeholder?: string;
    }
  | {
      type: "range";
      key: string;
      label?: string;
      min: number;
      max: number;
    }
  | {
      type: "checkbox";
      key: string;
      label?: string;
      options: { label: string; value: string; count?: number }[]; // varsa multi, yoksa single
      search?: {
        placeholder?: string;
      };
    };

export interface FilterGroupConfig {
  isTab: boolean;
  titleData?: TitleData;
  elements: FilterElementConfig[];
}

export type ToggleKeyMap = "inTr" | "inStock";

export type ActiveFilterChip = {
  key: string;
  value: string;
  label: string;
};

/* RESPONSE & PAYLOAD TYPES */

export interface ProductsApiResponse {
  data: Product[];
  pagination: PaginationData;
  filters: FilterGroupConfig[];
}

export type CategoriesApiResponse = CategoriesPageResponse;

export interface CategoryApiResponse{
  data: Product[];
  category: Category;
  pagination: PaginationData;
  filters: FilterGroupConfig[];
}
