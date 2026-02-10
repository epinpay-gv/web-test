import { baseFetcher } from "@/lib/api/baseFetcher";
import { ProductPageResponse, CategoriesPageResponse } from "./catalog.types";
import { FilterGroupConfig } from "./components/filters/Filters/types";

export interface ProductsApiResponse extends ProductPageResponse {
  filters: FilterGroupConfig[];
}

export type CategoriesApiResponse = CategoriesPageResponse

export const getProducts = (query: URLSearchParams) => {
  return baseFetcher<ProductsApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/products?${query.toString()}`
  );
};

export const getCategories = (query: URLSearchParams) => {
  return baseFetcher<CategoriesApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/categories?${query.toString()}`
  );
};
