// import { baseFetcher } from "@/lib/api/baseFetcher";
// import { OrdersPageApiResponse } from "./user.types";

// export const getOrders = (query: URLSearchParams) =>
//   baseFetcher<OrdersPageApiResponse>(
//     `${process.env.NEXT_PUBLIC_API_URL}/user/orders?${query.toString()}`,
//   );


import { baseFetcher } from "@/lib/api/baseFetcher";
import { Order, OrdersPageApiResponse } from "./user.types";
import { mockOrders } from "@/mocks/user/orders.mock";

export const getOrders = (query: URLSearchParams) =>
  baseFetcher<OrdersPageApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/user/orders?${query.toString()}`,
  );

// API bağlandığında mock satırını kaldıracağız baseFetcher satırını açacagız
// return baseFetcher<Order>(`${process.env.NEXT_PUBLIC_API_URL}/user/orders/${id}`);
export const getOrderById = (id: string): Promise<Order | null> =>
  Promise.resolve(mockOrders.find((o) => o.id === id) ?? null);