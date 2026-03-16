import { baseFetcher } from "@/lib/api/baseFetcher";
import { CartResponse, OrderDetailResponse, PaymentMethod, OrderAuthRequest } from "./types";

interface UpdateQuantityParams {
  itemId: string;
  newQuantity: number;
  currentQuantity: number;
}

interface CartActionBody {
  action: "increment" | "decrement";
}

export const cartService = {
  async getCart(userId?: string, guestId?: string): Promise<CartResponse> {
    const params = new URLSearchParams();
    if (userId) params.append("userId", userId);
    if (guestId) params.append("guestId", guestId);

    return baseFetcher<CartResponse>(
      `/api/cart?${params.toString()}`,
      { method: "GET", cache: "no-store" },
      "Sepet bilgileri alinamadi"
    );
  },

  getOrCreateGuestId(): string {
    if (typeof window === "undefined") return "";
    let guestId = localStorage.getItem("guest_id");
    if (!guestId) {
      guestId = `guest_${Math.random().toString(36).substring(2, 11)}`;
      localStorage.setItem("guest_id", guestId);
    }
    return guestId;
  },

  async updateQuantity(
    { itemId, newQuantity, currentQuantity }: UpdateQuantityParams,
    userId?: string,
    guestId?: string
  ): Promise<void> {
    const params = new URLSearchParams();
    if (userId) params.append("userId", userId);
    if (guestId) params.append("guestId", guestId);

    const diff = newQuantity - currentQuantity;
    if (diff === 0) return;

    const action: CartActionBody["action"] = diff > 0 ? "increment" : "decrement";
    const steps = Math.abs(diff);

    //! TODO: for kaldırılacak ve count ile sembol gönderilecek 
    for (let i = 0; i < steps; i++) {
      await baseFetcher<void, CartActionBody>(
        `/api/cart/item/${itemId}?${params.toString()}`,
        { method: "PATCH", body: { action } }
      );
    }
  },

  async removeItem(
    itemId: string,
    userId?: string,
    guestId?: string
  ): Promise<void> {
    const params = new URLSearchParams();
    if (userId) params.append("userId", userId);
    if (guestId) params.append("guestId", guestId);

    await baseFetcher<void>(
      `/api/cart/item/${itemId}?${params.toString()}`,
      { method: "DELETE" }
    );
  },
};

export const paymentService = {
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    return await baseFetcher<PaymentMethod[]>("/api/cart/payment-methods");
  },
};

export const orderService = {
  getOrderDetail: async (payload: OrderAuthRequest): Promise<OrderDetailResponse> => {
    return await baseFetcher<OrderDetailResponse, OrderAuthRequest>(
      `/api/order/${payload.order_id}`,
      { method: "POST", body: payload }
    );
  },
};