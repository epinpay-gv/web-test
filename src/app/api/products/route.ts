import { NextResponse } from "next/server";
import { mockProducts, filterGroups } from "@/mocks";
import { PaginationData } from "@/types/types";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const categories = searchParams.getAll("categoryId");
  const regions = searchParams.getAll("region");
  const platforms = searchParams.getAll("platform");
  const productTypes = searchParams.getAll("productType");

  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  let data = [...mockProducts];

  if (categories.length) {
    data = data.filter((p) =>
      categories.includes(String(p.category_id)),
    );
  }

  if (regions.length) {
    data = data.filter((p) =>
      regions.includes(String(p.region_id)),
    );
  }

  if (platforms.length) {
    data = data.filter((p) =>
      platforms.includes(String(p.platform_id)),
    );
  }

  if (productTypes.length) {
    data = data.filter((p) =>
      productTypes.includes(String(p.type_id)),
    );
  }

  if (minPrice) {
    data = data.filter(
      (p) => (p.epPrice ?? 0) >= Number(minPrice),
    );
  }

  if (maxPrice) {
    data = data.filter(
      (p) => (p.epPrice ?? 0) <= Number(maxPrice),
    );
  }

  const perPage = 8;

  return NextResponse.json({
    data,
    pagination: {
      count: data.length,
      per_page: perPage,
      current_page: 1,
      total_page: Math.ceil(data.length / perPage),
    } as PaginationData,
    filters: filterGroups,
  });
}
