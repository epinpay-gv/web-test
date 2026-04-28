import { baseFetcher } from "@/lib/api/baseFetcher";
import {
  BffOrderDetailApiResponse,
  BffOrdersPageApiResponse,
  DisputePayload,
  RaffleDetailPageApiResponse,
  RafflesPageApiResponse,
  TopupResponseResponse,
  UserMeResponse,
  WalletApiResponse,
  WalletDepositPageApiResponse,
} from "./user.types";


/* USER ME */
export const getUserMe = () =>
  baseFetcher<UserMeResponse>(
    `/user/me`,
  );

/* WALLET */
export const getWallet = (currencyId: string) =>
  // baseFetcher<BalanceHistoryApiResponse>(
  //   `/user/balance`,
  // );
  baseFetcher<WalletApiResponse>(
    `/user/wallet?currencyId=${currencyId}`,
  );

export const getWalletDepositPage = () =>
  baseFetcher<WalletDepositPageApiResponse>(
    `/user/wallet/deposit-page`,
  );

/* ORDERS */
export const getOrders = (
  search: Record<string, string | string[] | undefined>,
) => {
  const params = new URLSearchParams();
  Object.entries(search).forEach(([key, value]) => {
    if (!value) return;
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else {
      params.set(key, value);
    }
  });
  // return baseFetcher<OrdersPageApiResponse>(
  //   `/user/orders?${params.toString()}`,
  // );
  return baseFetcher<BffOrdersPageApiResponse>(
    `/user/orders?${params.toString()}`,
  );
};

export const getOrderById = (id: string) =>
  // baseFetcher<OrderDetailPageApiResponse>(
  //   `/user/orders/${id}`,
  // );
  baseFetcher<BffOrderDetailApiResponse>(
    `/user/orders/${id}`,
  );

export const viewEpin = (orderId: string, itemId: string) =>
  baseFetcher<TopupResponseResponse>(
    `/user/orders/${orderId}/items/${itemId}/view-epin`,
    { method: "POST" },
  );

export const confirmItem = (orderId: string, itemId: string) =>
  // confirmTopup eski endpoint:
  // baseFetcher(`/user/orders/${id}/items/${productId}`, ...)
  baseFetcher<TopupResponseResponse>(
    `/user/orders/${orderId}/items/${itemId}/confirm`,
    { method: "POST" },
  );

export const disputeItem = (orderId: string, itemId: string, payload: DisputePayload) =>
  baseFetcher<TopupResponseResponse, DisputePayload>(
    `/user/orders/${orderId}/items/${itemId}/dispute`,
    { method: "POST", body: payload },
  );

/* RAFFLES */
export const getRaffles = (
  search: Record<string, string | string[] | undefined>,
) => {
  const params = new URLSearchParams();
  Object.entries(search).forEach(([key, value]) => {
    if (!value) return;
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else {
      params.set(key, value);
    }
  });
  if (!params.has('limit')) {
    params.set('limit', '3');
  }

  return baseFetcher<RafflesPageApiResponse>(
    `/user/raffles?${params.toString()}`,
  );
};

export const getRaffleById = (id: string) =>
  // baseFetcher<RaffleDetailPageApiResponse>(
  //   `/user/raffles/${id}`,
  // );
  baseFetcher<RaffleDetailPageApiResponse>(
    `/user/raffles/${id}`,
  );

export const updateRaffle = (id: string, data: { title?: string, endDate?: string }) =>
  baseFetcher<any, { title?: string, endDate?: string }>(
    `${process.env.NEXT_PUBLIC_BFF_URL}/user/raffles/${id}`,
    {
      method: "PATCH",
      body: data,
    },
  );
