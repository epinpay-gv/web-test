// app/api/cartStore.ts
// Next.js dev modunda hot reload olduğunda store sıfırlanır,
// production'da ise module cache'de yaşar (single instance).
// Gerçek uygulamada Redis veya DB kullanılır.

import { mockProducts } from "@/mocks/products.mock";

export interface CartItemStore {
  id: string;
  quantity: number;
  basePrice: number | null;
  [key: string]: unknown;
}

interface CartStore {
  [sessionKey: string]: CartItemStore[];
}

// Global obje — Next.js module cache'inde yaşar
const globalStore = globalThis as typeof globalThis & {
  __cartStore?: CartStore;
};

if (!globalStore.__cartStore) {
  globalStore.__cartStore = {};
}

export const cartStore = globalStore.__cartStore;

// Session key: userId varsa userId, yoksa guestId
export function getSessionKey(userId?: string | null, guestId?: string | null): string {
  return userId || guestId || "anonymous";
}

// İlk kez erişilince mock veriden sepet oluştur
export function getOrCreateCart(sessionKey: string): CartItemStore[] {
  if (!cartStore[sessionKey]) {
    const randomCount = Math.floor(Math.random() * 2) + 2;
    const selected = [...mockProducts]
      .sort(() => 0.5 - Math.random())
      .slice(0, randomCount);

    cartStore[sessionKey] = selected.map((p) => ({
      ...p,
      id: String(p.id),
      quantity: Math.floor(Math.random() * 3) + 1,
      image: p.translation.imgUrl,
      price: p.basePrice,
      name: p.translation.name,
      seller: "Epinpay",
    }));
  }

  return cartStore[sessionKey];
}