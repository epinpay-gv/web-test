import { NextResponse } from "next/server";
import { mockCategories, mockProducts } from "@/mocks";

type Params = {
  category: string;
  product: string;
};

export async function GET(
  req: Request,
  { params }: { params: Promise<Params> },
) {
  const resolvedParams = await params;


  const { category, product } = resolvedParams;

  const productData = mockProducts.find(
    (item) => item.translation.slug === product,
  );

  // CATEGORY
  const categoryData = mockCategories.find(
    (item) => item.translation.slug === category,
  );

  // FAKE LATENCY
  await new Promise((r) => setTimeout(r, 300));

  return NextResponse.json({
    data: productData,
    category: categoryData,
  });
}
