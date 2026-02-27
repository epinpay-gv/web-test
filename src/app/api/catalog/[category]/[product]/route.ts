import { NextResponse } from "next/server";
import { mockCategories, mockProducts, mockMetadata } from "@/mocks";
import { ProductRegion, ProductPlatform } from "@/types/types";

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

  // CATEGORY
  const categoryData = mockCategories.find(
    (item) => item.translation.slug === category,
  );

  if (!categoryData) {
    return NextResponse.json(
      { message: "Category not found" },
      { status: 404 },
    );
  }

  const categoryProducts = mockProducts.filter(
    (item) => item.translation.category_slug === category,
  );

  // SELECTED PRODUCT
  const productData = categoryProducts.find(
    (item) => item.translation.slug === product,
  );

  if (!productData) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  // OTHER PRODUCTS FROM THE SAME CATEGORY (VARIANTS)
  const variants = categoryProducts;

  // UNIQUE REGIONS
  const regionMap = new Map<number, ProductRegion>();

  for (const item of categoryProducts) {
    if (!regionMap.has(item.region_id)) {
      regionMap.set(item.region_id, {
        id: item.region_id,
        translation: {
          id: item.region_id,
          locale: item.translation.locale,
          name: item.region,
        },
      });
    }
  }

  const regions = Array.from(regionMap.values());

  // UNIQUE PLATFORMS
  const platformMap = new Map<number, ProductPlatform>();

  for (const item of categoryProducts) {
    if (!platformMap.has(item.platform_id)) {
      platformMap.set(item.platform_id, {
        id: item.platform_id,
        translation: {
          id: item.platform_id,
          locale: item.translation.locale,
          name: item.platform,
        },
      });
    }
  }

  const platforms = Array.from(platformMap.values());

  // FAKE LATENCY
  await new Promise((r) => setTimeout(r, 200));

  return NextResponse.json({
    data: productData,
    category: {
      variants,
      regions,
      platforms,
      categoryData,
    },
    metadata: mockMetadata.find((m) => m.pageId === 1),
  });
}
