import { NextResponse } from "next/server";
import { mockMetadata } from "@/mocks";
import { PaginationData } from "@/types/types";
import { blogListMock } from "@/mocks/blogs.mock";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // pagination
  const page = Number(searchParams.get("page") ?? 1);
  const perPage = Number(searchParams.get("perPage") ?? 12);

  // --- PAGINATION ---
  const totalCount = blogListMock.blogs.length;
  const totalPage = Math.ceil(totalCount / perPage);

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const paginatedData = blogListMock.blogs.slice(start, end);

  // FAKE LATENCY
  await new Promise((r) => setTimeout(r, 300));

  return NextResponse.json({
    data: {
      hero: blogListMock.hero,
      popular: blogListMock.popular,
      blogs: paginatedData,
    },
    pagination: {
      count: totalCount,
      per_page: perPage,
      current_page: page,
      total_page: totalPage,
      has_more: page < totalPage,
    } as PaginationData,
    metadata: mockMetadata.filter((m) => m.pageId === 6),
  });
}
