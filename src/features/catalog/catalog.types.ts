import {
  Product,
  PaginationData,
  Category,
  ProductPlatform,
  ProductRegion,
  PageMetadata,
} from "@/types/types";
import { FilterGroupConfig } from "../filters/filters.types";

/* CATEGORY TYPES */
export interface CategoriesPageResponse {
  data: Category[];
  pagination: PaginationData;
}

/* PRODUCT DETAIL TYPES */
export interface CategoryWithProductDetail {
  variants: Product[];
  regions: ProductRegion[];
  platforms: ProductPlatform[];
  categoryData: Category;
}

/* RESPONSE & PAYLOAD TYPES */

export interface ProductsApiResponse {
  metadata: PageMetadata[];
  data: Product[];
  pagination: PaginationData;
  filters: FilterGroupConfig[];
}

export interface CategoriesApiResponse {
  metadata: PageMetadata;
  data: Category[];
  pagination: PaginationData;
}

export interface CategoryApiResponse {
  metadata: PageMetadata;
  data: Product[];
  category: Category;
  pagination: PaginationData;
  filters: FilterGroupConfig[];
}

export interface ProductDetailApiResponse {
  metadata: PageMetadata;
  data: Product;
  category: CategoryWithProductDetail;
}

export interface AddToCartPayload {
  productId: number;
  offerId: number;
  quantity: number;
}

export interface AddToFavoritesPayload {
  productId: number;
}

export interface ChangeQuantityPayload {
  productId: number;
  offerId: number;
  quantity: number;
  action: "add" | "remove" | "update";
}
export interface NotifyWhenAvailablePayload {
  productId: number;
}
