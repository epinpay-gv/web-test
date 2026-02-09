import { baseFetcher } from "@/lib/api/baseFetcher";
import { ProductPageResponse } from "./catalog.types";
import { FilterGroupConfig } from "./components/filters/Filters/types";

export interface ProductsApiResponse extends ProductPageResponse {
  filters: FilterGroupConfig[];
}

export const getProducts = (query: URLSearchParams) => {
  return baseFetcher<ProductsApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/products?${query.toString()}`
  );
};
