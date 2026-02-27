import { NextResponse } from 'next/server';
import { OrderDetailResponse } from '@/features/checkout/types';
import { PRODUCT_STATUS } from '@/types/types';

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
        {
           id: 105,
           category_id: 9,
           region_id: 1,
           platform_id: 4,
           type_id: 3,
           status: PRODUCT_STATUS.ACTIVE,
           translation: {
             category_slug: "pubg-mobile-uc",
             slug: "pubg-mobile-1800-uc-tr",
             description: "",
             metaTitle: "PUBG Mobile 1800 UC (Türkiye) Satın Al | Epinpay",
             metaDescription:
               "Epinpay üzerinden PUBG Mobile UC satın al! Yetkili tedarikçi güvencesiyle anında teslimat, güvenli ödeme ve destek. Royale Pass ve özel eşyalar seni bekliyor.",
             imgUrl:
               "https://cdn.epinpay.com/image/ep/2025/6/product/pubg-mobile-1800-uc-tr-36.webp",
             imgAlt: "PUBG Mobile 1800 UC (Türkiye) Satın Al | Epinpay",
             id: 1,
             locale: "tr",
             name: "PUBG Mobile 1800 UC TR",
           },
           cheapestOffer: {
             id: 877,
           },
           basePrice: 915,
           epPrice: null,
           discountRate: 15,
           fakePrice: 1000,
       
           isFavorite: false,
           genres: [],
           region: "Turkey",
           platform: "Mobile Games",
           type: "Epin",
           platform_icon: "",
           totalStock: 15,
         },
         {
           id: 2139,
           category_id: 9,
           region_id: 1,
           platform_id: 4,
           type_id: 3,
           status: PRODUCT_STATUS.ACTIVE,
           translation: {
             category_slug: "pubg-mobile-uc",
             slug: "pubg-mobile-3850-uc-tr",
             description: "",
             metaTitle: "PUBG Mobile 3850 UC (Türkiye) Satın Al | Epinpay",
             metaDescription:
               "Epinpay üzerinden PUBG Mobile UC satın al! Yetkili tedarikçi güvencesiyle anında teslimat, güvenli ödeme ve destek. Royale Pass ve özel eşyalar seni bekliyor.",
             imgUrl:
               "https://cdn.epinpay.com/image/ep/2025/6/product/pubg-mobile-3850-uc-tr-24.webp",
             imgAlt: "PUBG Mobile 3850 UC (Türkiye) Satın Al | Epinpay",
             id: 1,
             locale: "tr",
             name: "Pubg Mobile 3850 UC TR",
           },
           cheapestOffer: {
             id: 1011,
           },
           basePrice: 1829.5,
           epPrice: null,
           discountRate: 15,
           fakePrice: 2030,
           isFavorite: false,
           genres: [],
           region: "Turkey",
           platform: "Mobile Games",
           type: "Epin",
           platform_icon: "",
           totalStock: 15,
         },
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