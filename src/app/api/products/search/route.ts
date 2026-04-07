import { NextRequest, NextResponse } from 'next/server';
import { mockProducts } from '@/mocks/products.mock';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  const filtered = mockProducts.filter((product) => {
    const matchesQuery = product.translation.name.toLowerCase().includes(query) ||
                         product.translation.slug.toLowerCase().includes(query);
    const hasOffer = product.cheapestOffer && product.cheapestOffer.id;

    return matchesQuery && hasOffer;
  });

  return NextResponse.json(filtered.slice(0, 8));
}