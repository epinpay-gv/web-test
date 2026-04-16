import { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { cartService } from "../checkout.service";
import { CartItem, CartStep, CartResponse, CartSummary } from "../types";
import { baseFetcher } from "@/lib/api/baseFetcher";
import { toast } from "react-toastify";
import { PRODUCT_STATUS } from "@/types/types";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [summary, setSummary] = useState<CartSummary | null>(null);
  const [step, setStep] = useState<CartStep>("empty");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const user = useAuthStore((state) => state.user);

  const fetchCart = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await cartService.getCart();
      
      setItems(data.items);
      setTotalPrice(data.totalPrice);
      setSummary(data.summary ?? null);
      setStep(data.items.length > 0 ? "items" : "empty");
    } catch (err) {
      console.error("Cart fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const recalculateTotal = (updatedItems: CartItem[]): number =>
    updatedItems.reduce(
      (acc, curr) => acc + (curr.unitPrice ?? curr.basePrice ?? 0) * curr.quantity,
      0
    );

  // Optimistic update: önce UI güncellenir, sonra backend'e gönderilir.
  // Backend hata verirse önceki state geri yüklenir.
  const updateQuantity = useCallback(
    async (id: string, newQuantity: number) => {
      let previousItems: CartItem[] = [];

      // Optimistic update
      setItems((prev) => {
        previousItems = prev;
        const updated = prev.map((item) =>
          item.offerId === id ? { ...item, quantity: newQuantity } : item
        );
        setTotalPrice(recalculateTotal(updated));
        return updated;
      });

      try {
        await cartService.updateQuantity({ itemId: id, newQuantity });
      } catch (err) {
        const error = err as { status?: number; message?: string };
        console.error("Quantity update error:", error.status, error.message, err);
        setItems(previousItems);
        setTotalPrice(recalculateTotal(previousItems));
      }
    },
    []
  );

  const removeItem = useCallback(
    async (id: string) => {
      let previousItems: CartItem[] = [];

      setItems((prev) => {
        previousItems = prev;
        const updated = prev.filter((item) => item.offerId !== id);
        setTotalPrice(recalculateTotal(updated));
        if (updated.length === 0) setStep("empty");
        return updated;
      });

      try {
        await cartService.removeItem(id);
        toast.success("Ürün sepetten silindi");
      } catch (err) {
        const error = err as { status?: number; message?: string };
        console.error("Remove item error:", error.status, error.message, err);
        setItems(previousItems);
        setTotalPrice(recalculateTotal(previousItems));
        setStep("items");
      }
    },
    []
  );

  const resetCart = useCallback(async () => {
    setIsLoading(true);
    try {
      // BFF tarafında özel bir reset yoksa tüm itemları tek tek silebiliriz veya 
      // eğer BFF destekliyorsa ona göre güncellenebilir. 
      // Şimdilik sadece yeniden fetch edelim (BFF state'i temizlenmişse)
      await fetchCart();
    } catch (err) {
      console.error('Cart reset error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchCart]);

  return { items, totalPrice, summary, step, setStep, isLoading, updateQuantity, removeItem, resetCart };
}