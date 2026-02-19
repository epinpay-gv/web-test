import { NextResponse } from 'next/server';

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return NextResponse.json({
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    guestId: "guest_12345" 
  });
}