import { baseFetcher } from "@/lib/api/baseFetcher";
import { CartResponse } from "./types";

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