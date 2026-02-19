import { baseFetcher } from "@/lib/api/baseFetcher";
import { ProductsApiResponse, CategoriesApiResponse, CategoryApiResponse, ProductDetailApiResponse } from "./catalog.types";

export const getProducts = (query: URLSearchParams) => {
  return baseFetcher<ProductsApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/catalog/products?${query.toString()}`
  );
};

export const getCategories = (query: URLSearchParams) => {
  return baseFetcher<CategoriesApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/catalog/categories?${query.toString()}`
  );
};

export const getCategory = (query: URLSearchParams, category: string) => {
  return baseFetcher<CategoryApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/catalog/${category}?${query.toString()}`
  );
};

export const getProduct = (query: URLSearchParams, category: string, product: string) => {
  return baseFetcher<ProductDetailApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/catalog/${category}/${product}?${query.toString()}`
  );
};