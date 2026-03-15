import { baseFetcher } from "@/lib/api/baseFetcher";
import { OrderDetailPageApiResponse, OrdersPageApiResponse, TopupResponsePayload, TopupResponseResponse } from "./user.types";

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

export const getOrderById = (id: string) =>
   baseFetcher<OrderDetailPageApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/user/orders/${id}`);

export const confirmTopup= (id: string, productId: string, payload: TopupResponsePayload) =>
  baseFetcher<TopupResponseResponse, TopupResponsePayload>(
    `${process.env.NEXT_PUBLIC_API_URL}/user/orders/${id}/items/${productId}`,
    {
      method: "POST",
      body: payload,
    },
    "Topup bilgisi güncellendi",
  );