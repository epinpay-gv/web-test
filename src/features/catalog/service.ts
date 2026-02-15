import { baseFetcher } from "@/lib/api/baseFetcher";
import { ProductPageResponse, CategoriesPageResponse } from "./catalog.types";
import { FilterGroupConfig } from "./components/filters/Filters/types";

// RESPONSE TYPES
export interface ProductsApiResponse extends ProductPageResponse {
  filters: FilterGroupConfig[];
}
export type CategoriesApiResponse = CategoriesPageResponse

// REQUESTS
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

export const getCategory = (query: URLSearchParams, category: string) => {
  return baseFetcher<ProductsApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/${category}?${query.toString()}`
  );
};