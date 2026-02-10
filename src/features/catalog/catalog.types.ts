import { Product, Offer, PaginationData, Category } from "@/types/types";

export interface ProductPageResponse {
  data: Product[];
  pagination: PaginationData;
}

export interface CategoriesPageResponse {
  data: Category[];
  pagination: PaginationData;
}

export interface CategoryPageData extends Category{
  smth: ""
}

export type CatalogFilterState = {
  category: string[];
  region: string[];
  platform: string[];
  productType: string[]; // TAB + checkbox ortak
  price?: { min?: number; max?: number;};
  inTr?: boolean;
  inStock?: boolean;
};
