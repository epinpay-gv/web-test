import { NextResponse } from "next/server";
import { mockOrders } from "@/mocks/user/orders.mock";
import { PaginationData } from "@/types/types";
import { Order, OrderStatus } from "@/features/user/user.types";

const DEFAULT_PER_PAGE = 10;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const search = (searchParams.get("search") ?? "").toLowerCase();
  const dateParam = searchParams.get("date");
  const statusParam = searchParams.get("status") as OrderStatus | "ALL" | null;
  const page = Number(searchParams.get("page") ?? 1);
  const perPage = Number(searchParams.get("perPage") ?? DEFAULT_PER_PAGE);

  let data: Order[] = [...mockOrders];

  if (search) {
    data = data.filter(({ orderNumber, sellerName, products }) =>
      orderNumber.toLowerCase().includes(search) ||
      sellerName.toLowerCase().includes(search) ||
      products.some((p) => p.name.toLowerCase().includes(search))
    );
  }

  if (dateParam) {
    const start = new Date(`${dateParam}T00:00:00`);
    const end = new Date(`${dateParam}T23:59:59`);
    data = data.filter(({ createdAt }) => {
      const date = new Date(createdAt);
      return date >= start && date <= end;
    });
  }

  if (statusParam && statusParam !== "ALL") {
    data = data.filter(({ status }) => status === statusParam);
  }

  data.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const totalCount = data.length;
  const totalPage = Math.max(1, Math.ceil(totalCount / perPage));
  const currentPage = Math.min(Math.max(page, 1), totalPage);
  const start = (currentPage - 1) * perPage;

  return NextResponse.json({
    data: data.slice(start, start + perPage),
    pagination: {
      count: totalCount,
      per_page: perPage,
      current_page: currentPage,
      total_page: totalPage,
      has_more: currentPage < totalPage,
    } as PaginationData,
  });
}