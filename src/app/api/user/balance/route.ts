import { NextResponse } from "next/server";
import { PaginationData } from "@/types/types";
import { BalanceHistory } from "@/features/user/user.types";

const DEFAULT_PER_PAGE = 5;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const perPage = Math.max(
    1,
    Number(searchParams.get("perPage") ?? DEFAULT_PER_PAGE),
  );

  const mockData: BalanceHistory[] = [
    {
      id: "b-001",
      method: "Credit Card",
      date: "2026-03-01T10:00:00Z",
      amount: "245",
      currency: "£",
    },
    {
      id: "b-002",
      method: "Apple Pay",
      date: "2025-03-01T09:00:00Z",
      amount: "414,86",
      currency: "$",
    },
    {
      id: "b-003",
      method: "Credit Card",
      date: "2025-01-14T14:00:00Z",
      amount: "17858",
      currency: "TRY",
    },
  ];

  // ── Pagination ───────────────────────────────────────────────────────
  const totalCount = mockData.length;
  const totalPage = Math.max(1, Math.ceil(totalCount / perPage));
  const currentPage = Math.min(page, totalPage);

  return NextResponse.json({
    data: mockData,
    pagination: {
      count: totalCount,
      per_page: perPage,
      current_page: currentPage,
      total_page: totalPage,
      has_more: currentPage < totalPage,
    } as PaginationData,
  });
}
