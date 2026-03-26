import { baseFetcher } from "@/lib/api/baseFetcher";
import {
  ProductsApiResponse,
  CategoriesApiResponse,
  CategoryApiResponse,
  ProductDetailApiResponse,
  AddToCartPayload,
  AddToCartResponse,
  AddToFavoritesPayload,
  ChangeQuantityPayload,
  NotifyWhenAvailablePayload,
  TopupModalDataApiResponse,
} from "./catalog.types";

/* -------------------------- GET REQUESTS -------------------------- */

export const getProducts = (
  search: Record<string, string | string[] | undefined>,
) => {
  const params = new URLSearchParams();
  Object.entries(search).forEach(([key, value]) => {
    if (!value) return;
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else {
      params.set(key, value);
    }
  });
  return baseFetcher<ProductsApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/catalog/products?${params.toString()}`,
  );
};

// TODO : SEO schemaları ekle
export const getCategories = (query: URLSearchParams) =>
  baseFetcher<CategoriesApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/catalog/categories?${query.toString()}`,
  );

export const getCategory = (
  search: Record<string, string | string[] | undefined>,
  category: string,
) => {
  const params = new URLSearchParams();
  Object.entries(search).forEach(([key, value]) => {
    if (!value) return;
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else {
      params.set(key, value);
    }
  });
  return baseFetcher<CategoryApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/catalog/${category}?${params.toString()}`,
  );
};

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
  baseFetcher<AddToCartResponse, AddToCartPayload>(
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

  export const getTopupModalData = (productId: number) =>
  baseFetcher<TopupModalDataApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/catalog/topup-info/${productId}`,
  );