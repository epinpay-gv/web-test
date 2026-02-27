import { NextResponse } from 'next/server';
import { OrderDetailResponse } from '@/features/checkout/types';

export async function POST(
  request: Request,
  { params }: { params: { order_id: string } }
) {
  const resolvedParams = await params
  const orderId = resolvedParams.order_id
  const body = await request.json()
  const {email, userId} = body  
  const orders: Record<string, OrderDetailResponse> = {
    "ORD-123": {
      order_id: "ORD-123",
      status: "success",
      date: "26.02.2026",
      payment_method: "Apple Pay",
      user_info: {
        userId: "1",
        email: "macit.furkan.erkaya@gmail.com", 
        is_guest: true
      },
      products: [
        { id: "p1", name: "Valorant 1250 VP", price: 150.00, quantity: 1, image: "/images/vp.png" },
        { id: "p2", name: "PUBG Mobile 600 UC", price: 119.00, quantity: 1, image: "/images/uc.png" }
      ],
      invoice: {
        name: "Ahmet",
        surname: "Yılmaz",
        country: "Türkiye",
        city: "İzmir"
      },
      summary: {
        product_total: 269.00,
        commission: 9.47,
        taxes: 1.06,
        total: 253.33
      }
    },
    "ORD-456": {
      order_id: "ORD-456",
      status: "fail",
      date: "26.02.2026",
      payment_method: "Ziina",
      user_info: {
        userId: "1",
        email: "macit.furkan.erkaya@gmail.com",
        is_guest: true
      },
      products: [],
      invoice: null,
      summary: {
        product_total: 0,
        commission: 0,
        taxes: 0,
        total: 0
      }
    }
  };

  const orderData = orders[orderId];

 if (!orderData || (orderData.user_info.email !== email && orderData.user_info.userId !== userId)) {
    return NextResponse.json({ error: "Bu siparişe erişim yetkiniz yok." }, { status: 403 });
  }
  return NextResponse.json(orderData);
}