import { baseFetcher } from "@/lib/api/baseFetcher";
import { OrdersPageApiResponse } from "./user.types";

export const getOrders = (user_id: number, query: URLSearchParams) => {
  return baseFetcher<OrdersPageApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/user/orders?${query.toString()}`
  );
};