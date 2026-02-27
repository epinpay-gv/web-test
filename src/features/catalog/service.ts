import { baseFetcher } from "@/lib/api/baseFetcher";
import {
  ProductsApiResponse,
  CategoriesApiResponse,
  CategoryApiResponse,
  ProductDetailApiResponse,
  AddToCartPayload,
  AddToFavoritesPayload,
  ChangeQuantityPayload,
  NotifyWhenAvailablePayload,
} from "./catalog.types";

/* -------------------------- GET REQUESTS -------------------------- */

// TODO : SEO schemaları ekle
export const getProducts = (query: URLSearchParams) =>
  baseFetcher<ProductsApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/catalog/products?${query.toString()}`,
  );

// TODO : SEO schemaları ekle
export const getCategories = (query: URLSearchParams) =>
  baseFetcher<CategoriesApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/catalog/categories?${query.toString()}`,
  );

export const getCategory = (query: URLSearchParams, category: string) =>
  baseFetcher<CategoryApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/catalog/${category}?${query.toString()}`,
  );

export const getProduct = (
  query: string = "",
  category: string,
  product: string,
) =>
  baseFetcher<ProductDetailApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/catalog/${category}/${product}?${query}`,
  );

/* -------------------------- BASKET ACTIONS -------------------------- */

export const addToCartService = (payload: AddToCartPayload) =>
  baseFetcher<{ success: boolean }, AddToCartPayload>(
    `${process.env.NEXT_PUBLIC_API_URL}/catalog/add-to-cart`,
    {
      method: "POST",
      body: payload,
    },
    "Sepete eklenemedi",
  );

export const changeQuantityService = (payload: ChangeQuantityPayload) =>
  baseFetcher<{ success: boolean }, ChangeQuantityPayload>(
    `${process.env.NEXT_PUBLIC_API_URL}/catalog/change-quantity`,
    {
      method: "POST",
      body: payload,
    },
    "Sepet güncellenemedi",
  );

export const addToFavoritesService = (payload: AddToFavoritesPayload) =>
  baseFetcher<{ success: boolean }, AddToFavoritesPayload>(
    `${process.env.NEXT_PUBLIC_API_URL}/catalog/add-to-favorites`,
    {
      method: "POST",
      body: payload,
    },
    "Favorilere eklenemedi",
  );

export const notifyWhenAvailableService = (
  payload: NotifyWhenAvailablePayload,
) =>
  baseFetcher<{ success: boolean }, NotifyWhenAvailablePayload>(
    `${process.env.NEXT_PUBLIC_API_URL}/catalog/notify`,
    {
      method: "POST",
      body: payload,
    },
    "Bildirim oluşturulamadı",
  );