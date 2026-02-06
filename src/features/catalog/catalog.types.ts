import { Product, Offer, PaginationData, Category } from "@/types/types";

export interface ProductPageResponse extends PaginationData {
  data: Product[];
}

export interface CategoryPageData extends Category{
  smth: ""
}

export type CatalogFilterState = {
  category: string[];
  region: string[];
  platform: string[];
  productType: string[]; // TAB + checkbox ortak
  price?: {
    min?: number;
    max?: number;
  };
};
