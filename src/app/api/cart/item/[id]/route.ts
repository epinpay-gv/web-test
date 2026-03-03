import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/types/types';
import { mockProducts } from '@/mocks/products.mock';

type CartItemRecord = Product & { quantity: number };

declare global {
  var __mockCart: Map<string, CartItemRecord[]> | undefined;
}

if (!global.__mockCart) {
  global.__mockCart = new Map<string, CartItemRecord[]>();
}

const cartItems = global.__mockCart;

function getSessionKey(userId?: string | null, guestId?: string | null): string {
  return userId || guestId || 'anonymous';
}

function getOrCreateSessionCart(sessionKey: string): CartItemRecord[] {
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

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const guestId = searchParams.get('guestId');
  const { id } = await params;

  const body = await request.json() as { action?: string };

  if (body.action !== 'increment' && body.action !== 'decrement') {
    return NextResponse.json(
      { message: "Gecersiz action. 'increment' veya 'decrement' olmali." },
      { status: 400 }
    );
  }

  const sessionKey = getSessionKey(userId, guestId);
  const items = getOrCreateSessionCart(sessionKey);

  console.log('[PATCH] sessionKey:', sessionKey, '| aranan id:', id, '| sepetteki idler:', items.map(i => i.id));

  const item = items.find((i) => String(i.id) === String(id));

  if (!item) {
    return NextResponse.json(
      { message: `Urun bulunamadi: ${id}` },
      { status: 404 }
    );
  }

  if (body.action === 'increment') {
    item.quantity += 1;
  } else {
    if (item.quantity <= 1) {
      return NextResponse.json(
        { message: "Adet 1'den az olamaz." },
        { status: 400 }
      );
    }
    item.quantity -= 1;
  }

  const totalPrice = items.reduce(
    (acc, i) => acc + (i.basePrice ?? 0) * i.quantity,
    0
  );

  return NextResponse.json({
    item,
    totalPrice: parseFloat(totalPrice.toFixed(2)),
  });
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const guestId = searchParams.get('guestId');
  const { id } = await params;

  const sessionKey = getSessionKey(userId, guestId);
  const items = getOrCreateSessionCart(sessionKey);

  console.log('[DELETE] sessionKey:', sessionKey, '| aranan id:', id, '| sepetteki idler:', items.map(i => i.id));

  const index = items.findIndex((i) => String(i.id) === String(id));

  if (index === -1) {
    return NextResponse.json(
      { message: `Urun bulunamadi: ${id}` },
      { status: 404 }
    );
  }

  items.splice(index, 1);
  cartItems.set(sessionKey, items);

  const totalPrice = items.reduce(
    (acc, i) => acc + (i.basePrice ?? 0) * i.quantity,
    0
  );

  return NextResponse.json({
    success: true,
    totalPrice: parseFloat(totalPrice.toFixed(2)),
    remaining: items.length,
  });
}