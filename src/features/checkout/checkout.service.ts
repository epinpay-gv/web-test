import { baseFetcher } from "@/lib/api/baseFetcher";
import {
  CartResponse,
  OrderDetailResponse,
  PaymentMethod,
  OrderAuthRequest,
  PaymentPayload,
  PaymentLinkResponse,
} from "./types";

function getCurrencyCode(): string {
  if (typeof document === "undefined") return "USD";
  const value = `; ${document.cookie}`;
  const parts = value.split(`; currency=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? "USD";
  return "USD";
}

//TODO : Bunu payload dataya ekleyebiliriz. Bu şekilde kalacaksa bakiye yükleme akışında da kullanılmalı ve checkout>utils klasörüne taşınmalı.
export function buildRequiredFields(
  method: PaymentMethod,
): Record<string, string | number> {
  const extras: Record<string, string | number> = {};
  const currencyCode = getCurrencyCode();

  for (const field of method.requiredFields) {
    switch (field) {
      case "paymentMethod":
        extras.paymentMethod = method.slug;
        break;
      case "currencyId": {
        const opt = method.options.currencyId?.find(
          (o) => o.label === currencyCode,
        );
        if (opt) extras.currencyId = Number(opt.value);
        break;
      }
      case "cryptoNetwork":
        extras.cryptoNetwork = method.options.cryptoNetwork?.[0]?.value ?? "";
        break;
      case "cryptoToCurrency":
        extras.cryptoToCurrency =
          method.options.cryptoToCurrency?.[0]?.value ?? "";
        break;
    }
  }

  return extras;
}

const BFF_CHECKOUT_URL = "http://localhost:3041/api/features/checkout";

interface UpdateQuantityParams {
  itemId: string;
  newQuantity: number;
}

export const cartService = {
  /**
   * Mevcut kullanıcının (veya misafirin) sepetini getirir.
   */
  async getCart(): Promise<CartResponse> {
    return await baseFetcher<CartResponse>(
      `${BFF_CHECKOUT_URL}/cart`,
      { method: "GET", cache: "no-store" },
      "Sepet bilgileri alınamadı",
    );
  },

  /**
   * Sepetteki bir ürünün miktarını doğrudan günceller.
   */
  async updateQuantity({
    itemId,
    newQuantity,
  }: UpdateQuantityParams): Promise<void> {
    if (newQuantity < 1) return;

    await baseFetcher<void, { quantity: number }>(
      `${BFF_CHECKOUT_URL}/cart/item/${itemId}`,
      {
        method: "PATCH",
        body: { quantity: newQuantity },
      },
      "Ürün adedi güncellenemedi",
    );
  },

  /**
   * Ürünü sepetten kaldırır.
   */
  async removeItem(itemId: string): Promise<void> {
    await baseFetcher<void>(
      `${BFF_CHECKOUT_URL}/cart/item/${itemId}`,
      { method: "DELETE" },
      "Ürün sepetten kaldırılamadı",
    );
  },
};

export const paymentService = {
  /**
   * Aktif ödeme yöntemlerini (Lidio, Ziina, Gpay vb.) getirir.
   */
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    return await baseFetcher<PaymentMethod[]>(
      `${BFF_CHECKOUT_URL}/payment-methods`,
      { method: "GET" },
      "Ödeme yöntemleri alınamadı",
    );
  },

  /**
   * Uygun payment payloadu oluşturur (balance ve checkout sayfaları için)
   */
  createPaymentPayload(payload: PaymentPayload): PaymentPayload {
    return payload;
  },

  /**
   * Payment linki döndürür
   */
  async initiatePayment(payload: PaymentPayload): Promise<PaymentLinkResponse> {
    return await baseFetcher<PaymentLinkResponse, PaymentPayload>(
      `${BFF_CHECKOUT_URL}/payment/initiate`,
      { method: "POST", body: payload },
      "Ödeme başlatılamadı",
    );
  },
};

export const orderService = {
  /**
   * Oluşturulan bir siparişin detaylarını sorgular.
   */
  getOrderDetail: async (
    payload: OrderAuthRequest,
  ): Promise<OrderDetailResponse> => {
    return await baseFetcher<OrderDetailResponse, { email?: string }>(
      `${BFF_CHECKOUT_URL}/order/${payload.order_id}`,
      {
        method: "POST",
        body: { email: payload.email },
      },
      "Sipariş detayları alınamadı",
    );
  },
};