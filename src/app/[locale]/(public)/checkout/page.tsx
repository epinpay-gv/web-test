// app/[locale]/cart/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { EmptyCart } from '@/features/checkout/components/EmptyCart';
import { CartStep, CartItem } from '@/features/checkout/types';

export default function CartPage() {
  const [step, setStep] = useState<CartStep>('empty');
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await fetch('/api/cart');
        const data = await response.json();
        
        if (data.items.length > 0) {
          setCartItems(data.items);
          setStep('items');
        } else {
          setStep('empty');
        }
      } catch (error) {
        console.error("Sepet yüklenirken hata oluştu:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCart();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Yükleniyor
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <div className=" mx-auto px-4">
        
        {/* Adım Kontrolü (Step Manager) */}
        {step === 'empty' && <EmptyCart />}
        
        {step === 'items' && (
          <div className="text-white">
            {/* Buraya dolu sepet bileşeni gelecek */}
            <h2>Sepetinizdeki Ürünler</h2>
          </div>
        )}

        {/* Gelecek adımlar: delivery, payment vb. */}
      </div>
    </main>
  );
}