import { baseFetcher } from "@/lib/api/baseFetcher";
import { CartResponse, OrderDetailResponse, PaymentMethod, OrderAuthRequest } from "./types";

export const cartService = {
  async getCart(userId?: string, guestId?: string): Promise<CartResponse> {
    const params = new URLSearchParams();
    if (userId) params.append('userId', userId);
    if (guestId) params.append('guestId', guestId);

    return baseFetcher<CartResponse>(`/api/cart?${params.toString()}`, {
      method: "GET",
      cache: "no-store"
    }, "Sepet bilgileri alınamadı");
  },

  getOrCreateGuestId(): string {
    if (typeof window === 'undefined') return '';
    let guestId = localStorage.getItem('guest_id');
    if (!guestId) {
      guestId = `guest_${Math.random().toString(36).substring(2, 11)}`;
      localStorage.setItem('guest_id', guestId);
    }
    return guestId;
  }
};

export const paymentService = {
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    return await baseFetcher<PaymentMethod[]>('/api/cart/payment-methods');
  }
};

export const orderService = {
  getOrderDetail: async (payload: OrderAuthRequest): Promise<OrderDetailResponse> => {
    return await baseFetcher<OrderDetailResponse, OrderAuthRequest>(`/api/order/${payload.order_id}`, {
      method: 'POST',
      body: payload
    });
  }
};