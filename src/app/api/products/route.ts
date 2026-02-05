import { NextResponse } from "next/server";
import { mockProducts, filterGroups } from "@/mocks";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const categories = searchParams.getAll("category");
  const regions = searchParams.getAll("region");
  const platforms = searchParams.getAll("platform");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  let data = [...mockProducts];

  if (categories.length) {
    data = data.filter((p) => categories.includes(p.category));
  }

  if (regions.length) {
    data = data.filter((p) => regions.includes(p.region));
  }

  if (platforms.length) {
    data = data.filter((p) => platforms.includes(p.platform));
  }

  if (minPrice) {
    data = data.filter((p) => (p.epPrice ?? 0) >= Number(minPrice));
  }

  if (maxPrice) {
    data = data.filter((p) => (p.epPrice ?? 0) <= Number(maxPrice));
  }

  return NextResponse.json({
    data,
    pagination: {
      count: data.length,
      rows: data,
    },
    filters: filterGroups,   // dinamik filtre içeriği
  });
}

// BAckendden beklenen response:
// {
//   data: ProductPageData[];
//   pagination: PaginationData;
//   filters: FilterGroupConfig[];
// }
