import { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { cartService } from "../checkout.service";
import { CartItem, CartStep, CartResponse } from "../types";
import { baseFetcher } from "@/lib/api/baseFetcher";
import { toast } from "react-toastify";
import { PRODUCT_STATUS } from "@/types/types";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [step, setStep] = useState<CartStep>("empty");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const user = useAuthStore((state) => state.user);

  const fetchCart = useCallback(async () => {
    setIsLoading(true);
    try {
      // const data = await cartService.getCart();
      const data = {
        items: [
          {
            offerId: "1",
            unitPrice: 50,
            totalPrice: 100,
            quantity: 2,
            id: 2729,
            category_id: 11,
            region_id: 52,
            platform_id: 5,
            type_id: 2,
            status: PRODUCT_STATUS.ACTIVE,
            translation: {
              category_slug: "steam-cuzdan-kodu",
              slug: "5-usd-steam-cuzdan-kodu",
              description: "",
              metaTitle: "5 USD Steam Cüzdan Kodu - Hızlı ve Güvenli Satın Al | EpinPay",
              metaDescription: "Hemen steam cüzdan kodu satın al, Epinpay güvencesiyle anında teslimat ve avantajlı fiyat fırsatını kaçırma. Steam’de özgürce harca!",
              imgUrl: "https://cdn.epinpay.com/image/ep/2025/3/product/5-usd-steam-cuzdan-kodu-37.webp",
              imgAlt: "5 USD Steam Cüzdan Kodu - Hızlı ve Güvenli Satın Al | EpinPay",
              id: 1,
              locale: "tr",
              name: "5 USD Steam Cüzdan Kodu",
            },
            cheapestOffer: { id: 819 },
            basePrice: 228,
            epPrice: null,
            discountRate: 0,
            fakePrice: null,

            isFavorite: false,
            genres: [],
            region: "Global",
            platform: "PC Games",
            type: "Wallet Code",
            platform_icon: "",
            totalStock: 0,
          },
        ],
        totalPrice: 100,
      } as unknown as CartResponse;
      setItems(data.items);
      setTotalPrice(data.totalPrice);
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
      (acc, curr) => acc + (curr.unitPrice ?? 0) * curr.quantity,
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

  return { items, totalPrice, step, setStep, isLoading, updateQuantity, removeItem, resetCart };
}