import { NextResponse } from "next/server";
import { mockProducts, filterGroups } from "@/mocks";
import { PaginationData } from "@/types/types";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // filters
  const categories = searchParams.getAll("category");
  const regions = searchParams.getAll("region");
  const platforms = searchParams.getAll("platform");
  const productTypes = searchParams.getAll("productType");

  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  // pagination
  const page = Number(searchParams.get("page") ?? 1);
  const perPage = Number(searchParams.get("perPage") ?? 16);

  let data = [...mockProducts];

  // --- FILTERS ---
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

  // --- PAGINATION ---
  const totalCount = data.length;
  const totalPage = Math.ceil(totalCount / perPage);

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const paginatedData = data.slice(start, end);

    // FAKE LATENCY
  await new Promise((r) => setTimeout(r, 300));

  return NextResponse.json({
    data: paginatedData,
    pagination: {
      count: totalCount,
      per_page: perPage,
      current_page: page,
      total_page: totalPage,
      has_more: page < totalPage,
    } as PaginationData,
    filters: filterGroups,
  });
}
