// app/api/payment-methods/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const paymentMethods = [
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      commission: '+%4.1',
      description: 'Bu ödeme yönteminde tutar farklı para birimiyle gösterilebilir',
      icon: '/image/footer/paymethods/apple-pay.png', // İkon yollarını projene göre güncelle
      status: 'active'
    },
    {
      id: 'google-pay',
      name: 'Google Pay',
      commission: '+%4.1',
      description: 'Bu ödeme yönteminde tutar farklı para birimiyle gösterilebilir',
      icon: '/image/footer/paymethods/google-pay.png',
      status: 'active'
    },
    {
      id: 'visa',
      name: 'Visa',
      commission: '+%3.4',
      description: 'Bu ödeme yönteminde tutar farklı para birimiyle gösterilebilir',
      icon: '/image/footer/paymethods/visa.png',
      status: 'active'
    },
    {
      id: 'paypal',
      name: 'Paypal',
      commission: '+%0',
      description: 'Bulunduğunuz bölgede geçersizdir',
      icon: '/image/footer/paymethods/paypal.png',
      status: 'disabled'
    }
  ];

  return NextResponse.json(paymentMethods);
}