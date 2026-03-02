import { baseFetcher } from "@/lib/api/baseFetcher";
import { OrdersPageApiResponse } from "./user.types";

export const getOrders = (query: URLSearchParams) =>
  baseFetcher<OrdersPageApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/user/orders?${query.toString()}`,
  );