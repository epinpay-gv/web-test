import { NextResponse } from "next/server";
import { mockOrders, filterUserOrderMock } from "@/mocks/user/orders.mock";
import { PaginationData } from "@/types/types";
import { Order, OrderStatus } from "@/features/user/user.types";

const DEFAULT_PER_PAGE = 5;

const STATUS_TO_FILTER_TAB: Record<OrderStatus, "completed" | "pending" | "cancelled"> = {
  COMPLETED: "completed",
  PAYMENT_SUCCESS: "pending", 
  PENDING_PAYMENT: "pending", 
  CANCELLED: "cancelled",
  TIMEOUT: "cancelled",
  PAYMENT_FAILED: "completed"
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const search    = (searchParams.get("search") ?? "").toLowerCase().trim();
  const dateFrom  = searchParams.get("dateFrom");   
  const dateTo    = searchParams.get("dateTo");
  const statusTab = searchParams.get("status");     
  const page      = Math.max(1, Number(searchParams.get("page")    ?? 1));
  const perPage   = Math.max(1, Number(searchParams.get("perPage") ?? DEFAULT_PER_PAGE));

  let data: Order[] = [...mockOrders];

  if (search) {
    data = data.filter(({ orderNumber, sellerName, products }) =>
      orderNumber.toLowerCase().includes(search) ||
      sellerName.toLowerCase().includes(search)  ||
      products.some((p) => p.name.toLowerCase().includes(search))
    );
  }

  // ── Date range filter 
  if (dateFrom || dateTo) {
    const start = dateFrom ? new Date(`${dateFrom}T00:00:00`) : null;
    const end   = dateTo   ? new Date(`${dateTo}T23:59:59`)   : null;

    data = data.filter(({ createdAt }) => {
      const orderDate = new Date(createdAt);
      if (start && orderDate < start) return false;
      if (end   && orderDate > end)   return false;
      return true;
    });
  }

  // ── Status tab filter 
  if (statusTab && statusTab !== "all") {
    data = data.filter(
      ({ status }) => STATUS_TO_FILTER_TAB[status] === statusTab
    );
  }

  // ── Sort 
  data.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // ── Pagination 
  const totalCount  = data.length;
  const totalPage   = Math.max(1, Math.ceil(totalCount / perPage));
  const currentPage = Math.min(page, totalPage);
  const sliceStart  = (currentPage - 1) * perPage;

  return NextResponse.json({
    data: data.slice(sliceStart, sliceStart + perPage),
    pagination: {
      count:        totalCount,
      per_page:     perPage,
      current_page: currentPage,
      total_page:   totalPage,
      has_more:     currentPage < totalPage,
    } as PaginationData,
    filters: filterUserOrderMock,
  });
}