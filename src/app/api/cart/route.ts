// app/api/cart/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { mockProducts } from '@/mocks/products.mock';
import { Product } from '@/types/types';

export type CartItemRecord = Product & { quantity: number };

declare global {
  // eslint-disable-next-line no-var
  var __mockCart: Map<string, CartItemRecord[]> | undefined;
}

if (!global.__mockCart) {
  global.__mockCart = new Map<string, CartItemRecord[]>();
}

export const cartItems: Map<string, CartItemRecord[]> = global.__mockCart;

function getSessionKey(userId?: string | null, guestId?: string | null): string {
  return userId || guestId || 'anonymous';
}

export function getOrCreateSessionCart(sessionKey: string): CartItemRecord[] {
  if (!cartItems.has(sessionKey)) {
    const randomCount = Math.floor(Math.random() * 2) + 2;
    const selected: CartItemRecord[] = [...mockProducts]
      .sort(() => 0.5 - Math.random())
      .slice(0, randomCount)
      .map((product) => ({
        ...product,
        quantity: Math.floor(Math.random() * 3) + 1,
      }));
    cartItems.set(sessionKey, selected);
  }
  return cartItems.get(sessionKey)!;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const guestId = searchParams.get('guestId');
  const reset = searchParams.get('reset');

  await new Promise((resolve) => setTimeout(resolve, 800));

  if (guestId === 'empty' || (!userId && !guestId)) {
    return NextResponse.json({
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
      step: 'empty',
    });
  }

  const sessionKey = getSessionKey(userId, guestId);

  // ?reset=true ile sepeti sifirla — yeni mock urunler gelir
  if (reset === 'true') {
    cartItems.delete(sessionKey);
  }

  const items = getOrCreateSessionCart(sessionKey);

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + (item.basePrice ?? 0) * item.quantity,
    0
  );

  return NextResponse.json({
    items,
    totalQuantity,
    totalPrice: parseFloat(totalPrice.toFixed(2)),
    step: 'items',
  });
}