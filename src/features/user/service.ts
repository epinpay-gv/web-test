import { baseFetcher } from "@/lib/api/baseFetcher";
import { Order, OrdersPageApiResponse } from "./user.types";
import { mockOrders } from "@/mocks/user/orders.mock";

export const getOrders = (search: Record<string, string | string[] | undefined>,) =>{
  const params = new URLSearchParams();
  Object.entries(search).forEach(([key, value]) => {
    if (!value) return;
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else {
      params.set(key, value);
    }
  });
  return baseFetcher<OrdersPageApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/user/orders?${params.toString()}`,
  );
};

// API bağlandığında mock satırını kaldıracağız baseFetcher satırını açacagız
// return baseFetcher<Order>(`${process.env.NEXT_PUBLIC_API_URL}/user/orders/${id}`);
export const getOrderById = (id: string): Promise<Order | null> =>
  Promise.resolve(mockOrders.find((o) => o.id === id) ?? null);