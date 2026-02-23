// app/[locale]/cart/page.tsx
'use client';

import { useState, useEffect } from 'react';
// import { useAuthStore } from '@/features/auth/store/auth.store';
// import { cartService } from '@/features/checkout/service';
import { EmptyCart } from '@/features/checkout/components/EmptyCart';
// import { CartItem } from '@/features/checkout/types';
import { FilledCart } from '@/features/checkout/components/FilledCart';
import { useCart } from '@/features/checkout/hooks/useCart';

export default function CartPage() {
  const { items, totalPrice, step, setStep, isLoading, updateQuantity } = useCart();
  
  // const user = useAuthStore((state) => state.user);
  // const isAuthenticated = useAuthStore((state) => state.user);

  // useEffect(() => {
  //   async function initCart() {
  //     try {
  //       const guestId = cartService.getOrCreateGuestId();
  //       const data = await cartService.getCart(user?.id, guestId);
  //       setItems(data.items);
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   initCart();
  // }, [user?.id, isAuthenticated]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute max-lg:hidden w-193.5 h-166 -right-60.5 -bottom-15 bg-[#4FA9E2] opacity-20 blur-[229px] z-0 pointer-events-none overflow-hidden" />      
      <div className=" mx-auto px-4 pb-20 relative ">
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="text-white">
            <FilledCart 
              items={items} 
              totalPrice={totalPrice} 
              step={step}
              onStepChange={setStep}
              onQuantityChange={updateQuantity}
            />
          </div>
        )}
      </div>
    </div>
  );
}