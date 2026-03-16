import { NextResponse } from "next/server";
import {
  userRafflesMockData,
  userRafflesFilters,
} from "@/mocks";
import { PaginationData } from "@/types/types";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);


  // pagination
  const page = Number(searchParams.get("page") ?? 1);
  const perPage = Number(searchParams.get("perPage") ?? 6);

  const data = [...userRafflesMockData];

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
    filters: userRafflesFilters,
  });
}
