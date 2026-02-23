
import { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { cartService } from "../service";
import { CartItem, CartStep } from "../types";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [step, setStep] = useState<CartStep>("empty");
  const [isLoading, setIsLoading] = useState(true);

  const user = useAuthStore((state) => state.user);

  const fetchCart = useCallback(async () => {
    setIsLoading(true);
    try {
      const guestId = cartService.getOrCreateGuestId();
      const data = await cartService.getCart(user?.id, guestId);
      
      setItems(data.items);
      setTotalPrice(data.totalPrice);
      setStep(data.items.length > 0 ? (data.step || "items") : "empty");
    } catch (err) {
      console.error("Cart loading error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const updateQuantity = async (id: string, newQuantity: number) => {
    // Burada mock bir update isteği atılabilir veya local state güncellenebilir
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
    // Toplam fiyatı yeniden hesapla (Mock)
    setTotalPrice(prev => prev); 
  };

  return { items, totalPrice, step, setStep, isLoading, updateQuantity, refreshCart: fetchCart };
}