// app/api/cart/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { mockProducts } from '@/mocks/products.mock'; // Dosya yolunu kontrol et

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const guestId = searchParams.get('guestId');

  // Simülasyon gecikmesi
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Boş sepet senaryosu
  if (guestId === 'empty' || (!userId && !guestId)) {
    return NextResponse.json({
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
      step: 'empty'
    });
  }

  // Rastgele 2 veya 3 ürün seçme mantığı
  const randomCount = Math.floor(Math.random() * 2) + 2; // 2 veya 3
  const selectedProducts = [...mockProducts]
    .sort(() => 0.5 - Math.random()) // Diziyi karıştır
    .slice(0, randomCount);

  // Ürünleri sepet formatına map'liyoruz
  const cartItems = selectedProducts.map(product => ({
    ...product,
    quantity: Math.floor(Math.random() * 3) + 1, // Rastgele 1-3 adet
    // ProductCard'ın beklediği image prop'unu imgUrl'den alıyoruz
    image: product.translation.imgUrl,
    // Fiyatı basePrice'dan alıyoruz
    price: product.basePrice,
    name: product.translation.name,
    seller: "Epinpay" // Tasarımdaki satıcı bilgisi
  }));

  // Toplam hesaplamaları
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => {
    const price = item.price ?? 0; 
    return acc + (price * item.quantity);
  }, 0);

  return NextResponse.json({
    items: cartItems,
    totalQuantity,
    totalPrice: parseFloat(totalPrice.toFixed(2)),
    step: 'items'
  });
}