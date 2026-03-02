// features/cart/hooks/useCart.ts
import { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { cartService } from "../service";
import { CartItem, CartStep } from "../types";

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

  const updateQuantity = (id: string, newQuantity: number) => {
    setItems(prev => prev.map(item => 
      String(item.id) === id ? { ...item, quantity: newQuantity } : item
    ));
    const newTotal = items.reduce((acc, curr) => acc + (curr.basePrice ?? 0) * curr.quantity, 0);
    setTotalPrice(newTotal);
  };
  return { items, totalPrice, step, setStep, isLoading, updateQuantity };
}