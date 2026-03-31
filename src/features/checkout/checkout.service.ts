import { baseFetcher } from "@/lib/api/baseFetcher";
import { CartResponse, OrderDetailResponse, PaymentMethod, OrderAuthRequest } from "./types";

// TODO : Bu test için eklendi, bff testlerinden sonra silinecek
// const BFF_BASE_URL = "http://localhost:3041/api/features/checkout"; 
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
      `${process.env.NEXT_PUBLIC_API_URL}/cart`,
      { method: "GET", cache: "no-store" },
      "Sepet bilgileri alınamadı"
    );
  },

  /**
   * Sepetteki bir ürünün miktarını doğrudan günceller.
   */
  async updateQuantity(
    { itemId, newQuantity }: UpdateQuantityParams
  ): Promise<void> {
    if (newQuantity < 1) return;

    await baseFetcher<void, { quantity: number }>(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/item/${itemId}`,
      {
        method: "PATCH",
        body: { quantity: newQuantity }
      },
      "Ürün adedi güncellenemedi"
    );
  },

  /**
   * Ürünü sepetten kaldırır.
   */
  async removeItem(itemId: string): Promise<void> {
    await baseFetcher<void>(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/item/${itemId}`,
      { method: "DELETE" },
      "Ürün sepetten kaldırılamadı"
    );
  },
};

export const paymentService = {
  /**
   * Aktif ödeme yöntemlerini (Lidio, Ziina, Gpay vb.) getirir.
   */
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    return await baseFetcher<PaymentMethod[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/payment-methods`,
      { method: "GET" },
      "Ödeme yöntemleri alınamadı"
    );
  },
};

export const orderService = {
  /**
   * Oluşturulan bir siparişin detaylarını sorgular.
   */
  getOrderDetail: async (payload: OrderAuthRequest): Promise<OrderDetailResponse> => {
    return await baseFetcher<OrderDetailResponse, { email?: string }>(
      `${process.env.NEXT_PUBLIC_API_URL}/order/${payload.order_id}`,
      {
        method: "POST",
        body: { email: payload.email }
      },
      "Sipariş detayları alınamadı"
    );
  },
};