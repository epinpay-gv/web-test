import { baseFetcher } from "@/lib/api/baseFetcher";
import { ProductsApiResponse, CategoriesApiResponse, CategoryApiResponse } from "./catalog.types";

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
  return baseFetcher<CategoryApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/${category}?${query.toString()}`
  );
};