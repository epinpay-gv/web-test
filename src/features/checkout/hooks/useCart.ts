// features/cart/hooks/useCart.ts
import { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { cartService } from "../checkout.service";
import { CartItem, CartStep, CartResponse } from "../types";
import { baseFetcher } from "@/lib/api/baseFetcher";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [step, setStep] = useState<CartStep>("empty");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const user = useAuthStore((state) => state.user);

  const fetchCart = useCallback(async () => {
    setIsLoading(true);
    try {
      const guestId = cartService.getOrCreateGuestId();
      const data = await cartService.getCart(user?.uid || user?.id, guestId);
      setItems(data.items);
      setTotalPrice(data.totalPrice);
      setStep(data.items.length > 0 ? "items" : "empty");
    } catch (err) {
      console.error("Cart fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.uid, user?.id]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const recalculateTotal = (updatedItems: CartItem[]): number =>
    updatedItems.reduce(
      (acc, curr) => acc + (curr.basePrice ?? 0) * curr.quantity,
      0
    );

  // Optimistic update: önce UI güncellenir, sonra backend'e gönderilir.
  // Backend hata verirse önceki state geri yüklenir.
  const updateQuantity = useCallback(
    async (id: string, newQuantity: number, currentQuantity: number) => {
      let previousItems: CartItem[] = [];

      // Optimistic update
      setItems((prev) => {
        previousItems = prev;
        const updated = prev.map((item) =>
          String(item.id) === id ? { ...item, quantity: newQuantity } : item
        );
        setTotalPrice(recalculateTotal(updated));
        return updated;
      });

      try {
        const guestId = cartService.getOrCreateGuestId();
        await cartService.updateQuantity(
          { itemId: id, newQuantity, currentQuantity },
          user?.uid || user?.id,
          guestId
        );
      } catch (err) {
        const error = err as { status?: number; message?: string };
        console.error("Quantity update error:", error.status, error.message, err);
        setItems(previousItems);
        setTotalPrice(recalculateTotal(previousItems));
      }
    },
    [user?.uid, user?.id]
  );

  const removeItem = useCallback(
    async (id: string) => {
      let previousItems: CartItem[] = [];

      setItems((prev) => {
        previousItems = prev;
        const updated = prev.filter((item) => String(item.id) !== id);
        setTotalPrice(recalculateTotal(updated));
        if (updated.length === 0) setStep("empty");
        return updated;
      });

      try {
        const guestId = cartService.getOrCreateGuestId();
        await cartService.removeItem?.(id, user?.uid || user?.id, guestId);
      } catch (err) {
        const error = err as { status?: number; message?: string };
        console.error("Remove item error:", error.status, error.message, err);
        setItems(previousItems);
        setTotalPrice(recalculateTotal(previousItems));
        setStep("items");
      }
    },
    [user?.uid, user?.id]
  );

  const resetCart = useCallback(async () => {
    setIsLoading(true);
    try {
      const guestId = cartService.getOrCreateGuestId();
      const params = new URLSearchParams();
      if (user?.uid || user?.id) params.append('userId', user?.uid || user?.id);
      if (guestId) params.append('guestId', guestId);
      params.append('reset', 'true');

      const data = await baseFetcher<CartResponse>(`/api/cart?${params.toString()}`, {
        method: 'GET',
        cache: 'no-store',
      });
      setItems(data.items);
      setTotalPrice(data.totalPrice);
      setStep(data.items.length > 0 ? 'items' : 'empty');
    } catch (err) {
      console.error('Cart reset error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.uid, user?.id]);

  return { items, totalPrice, step, setStep, isLoading, updateQuantity, removeItem, resetCart };
}