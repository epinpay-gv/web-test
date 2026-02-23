// app/api/cart/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const guestId = searchParams.get('guestId');

  await new Promise((resolve) => setTimeout(resolve, 800));
  if (guestId === 'empty' || (!userId && !guestId)) {
    return NextResponse.json({
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
      step: 'empty'
    });
  }
  return NextResponse.json({
    items: [
      { id: '1', name: 'Valorant 1200 VP', price: 250, quantity: 1, image: '/image/mock/vp.png' }
    ],
    totalQuantity: 1,
    totalPrice: 250,
    step: 'items'
  });
}