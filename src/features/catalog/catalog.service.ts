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

const BFF_URL = "http://192.168.1.117:3041/api/features";
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
    `${BFF_URL}/catalog/products?${params.toString()}`,
    // `${process.env.NEXT_PUBLIC_API_URL}/catalog/products?${params.toString()}`,
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
const BFF_CHECKOUT_URL = "http://localhost:3041/api/features/checkout";

export const addToCartService = async (payload: AddToCartPayload) =>
  await baseFetcher<AddToCartResponse, AddToCartPayload>(
    `${BFF_CHECKOUT_URL}/cart`,
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
    `${BFF_CHECKOUT_URL}/cart/item/${payload.offerId}`,
    {
      method: "PATCH",
      body: { quantity: payload.quantity },
    },
    "Sepet güncellenemedi",
  );
};

export const addToFavoritesService = async (payload: AddToFavoritesPayload) =>
  await baseFetcher<{ success: boolean }, AddToFavoritesPayload>(
    `${process.env.NEXT_PUBLIC_API_URL}/catalog/add-to-favorites`,
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
    `${process.env.NEXT_PUBLIC_API_URL}/catalog/notify`,
    {
      method: "POST",
      body: payload,
    },
    "Bildirim oluşturulamadı",
  );

export const getTopupModalData = async (productId: number) =>
  await baseFetcher<TopupModalDataApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/catalog/topup-info/${productId}`,
  );