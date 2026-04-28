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
    `${process.env.NEXT_PUBLIC_BFF_URL}/user/me`,
  );

/* WALLET */
export const getWallet = (currencyId: string) =>
  // baseFetcher<BalanceHistoryApiResponse>(
  //   `${process.env.NEXT_PUBLIC_API_URL}/user/balance`,
  // );
  baseFetcher<WalletApiResponse>(
    `${process.env.NEXT_PUBLIC_BFF_URL}/user/wallet?currencyId=${currencyId}`,
  );

export const getWalletDepositPage = () =>
  baseFetcher<WalletDepositPageApiResponse>(
    `${process.env.NEXT_PUBLIC_BFF_URL}/user/wallet/deposit-page`,
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
  //   `${process.env.NEXT_PUBLIC_API_URL}/user/orders?${params.toString()}`,
  // );
  return baseFetcher<BffOrdersPageApiResponse>(
    `${process.env.NEXT_PUBLIC_BFF_URL}/user/orders?${params.toString()}`,
  );
};

export const getOrderById = (id: string) =>
  // baseFetcher<OrderDetailPageApiResponse>(
  //   `${process.env.NEXT_PUBLIC_API_URL}/user/orders/${id}`,
  // );
  baseFetcher<BffOrderDetailApiResponse>(
    `${process.env.NEXT_PUBLIC_BFF_URL}/user/orders/${id}`,
  );

export const viewEpin = (orderId: string, itemId: string) =>
  baseFetcher<TopupResponseResponse>(
    `${process.env.NEXT_PUBLIC_BFF_URL}/user/orders/${orderId}/items/${itemId}/view-epin`,
    { method: "POST" },
  );

export const confirmItem = (orderId: string, itemId: string) =>
  // confirmTopup eski endpoint:
  // baseFetcher(`${process.env.NEXT_PUBLIC_BFF_URL}/user/orders/${id}/items/${productId}`, ...)
  baseFetcher<TopupResponseResponse>(
    `${process.env.NEXT_PUBLIC_BFF_URL}/user/orders/${orderId}/items/${itemId}/confirm`,
    { method: "POST" },
  );

export const disputeItem = (orderId: string, itemId: string, payload: DisputePayload) =>
  baseFetcher<TopupResponseResponse, DisputePayload>(
    `${process.env.NEXT_PUBLIC_BFF_URL}/user/orders/${orderId}/items/${itemId}/dispute`,
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
    `${process.env.NEXT_PUBLIC_BFF_URL}/user/raffles?${params.toString()}`,
  );
};

export const getRaffleById = (id: string) =>
  // baseFetcher<RaffleDetailPageApiResponse>(
  //   `${process.env.NEXT_PUBLIC_API_URL}/user/raffles/${id}`,
  // );
  baseFetcher<RaffleDetailPageApiResponse>(
    `${process.env.NEXT_PUBLIC_BFF_URL}/user/raffles/${id}`,
  );

export const updateRaffle = (id: string, data: { title?: string, endDate?: string }) =>
  baseFetcher<any, { title?: string, endDate?: string }>(
    `${process.env.NEXT_PUBLIC_BFF_URL}/user/raffles/${id}`,
    {
      method: "PATCH",
      body: data,
    },
  );
