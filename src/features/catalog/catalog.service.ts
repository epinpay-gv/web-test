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
  params.set("per_page", "12");
  return baseFetcher<ProductsApiResponse>(
    `/catalog/products?${params.toString()}`,
  );
};

export const getCategories = (query: URLSearchParams) =>
  baseFetcher<CategoriesApiResponse>(`/catalog/categories?${query.toString()}`);

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
  params.set("per_page", "12");
  return baseFetcher<CategoryApiResponse>(
    `/catalog/${category}?${params.toString()}`,
  );
};

export const getProduct = (
  query: string = "",
  category: string,
  product: string,
) =>
  baseFetcher<ProductDetailApiResponse>(
    `/catalog/${category}/${product}?${query}`,
  );

/* -------------------------- BASKET ACTIONS -------------------------- */

export const addToCartService = async (payload: AddToCartPayload) =>
  await baseFetcher<AddToCartResponse, AddToCartPayload>(
    `/checkout/cart`,
    {
      method: "POST",
      body: payload,
    },
    "Sepete eklenemedi",
  );

export const changeQuantityService = async (payload: ChangeQuantityPayload) => {
  // BFF'de güncelleme PATCH /cart/item/:itemId ile yapılıyor.
  // Catalog tarafındaki payload'da offerId var, bunu itemId olarak kullanıyoruz.
  return await baseFetcher<{ success: boolean }, { quantity: number }>(
    `/checkout/cart/item/${payload.offerId}`,
    {
      method: "PATCH",
      body: { quantity: payload.quantity },
    },
    "Sepet güncellenemedi",
  );
};

export const addToFavoritesService = async (payload: AddToFavoritesPayload) =>
  await baseFetcher<{ success: boolean }, AddToFavoritesPayload>(
    `/catalog/add-to-favorites`,
    {
      method: "POST",
      body: payload,
    },
    "Favorilere eklenemedi",
  );

export const notifyWhenAvailableService = async (
  payload: NotifyWhenAvailablePayload,
) =>
  await baseFetcher<{ success: boolean }, NotifyWhenAvailablePayload>(
    `/catalog/notify`,
    {
      method: "POST",
      body: payload,
    },
    "Bildirim oluşturulamadı",
  );

export const getTopupModalData = async (productId: number) =>
  await baseFetcher<TopupModalDataApiResponse>(
    `/catalog/topup-info/${productId}`,
  );
