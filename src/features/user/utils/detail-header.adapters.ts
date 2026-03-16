import { DetailHeaderData, Order } from "@/features/user/user.types";
import { getOrderDisplayStatus, ORDER_DISPLAY_LABELS, ORDER_DISPLAY_COLORS, getRaffleDisplayStatus, RAFFLE_DISPLAY_LABELS, RAFFLE_DISPLAY_COLORS } from "./status.mappers";
import { Raffle } from "@/types/types";

export function orderToDetailHeader(order: Order): DetailHeaderData {
  const displayStatus = getOrderDisplayStatus(order.status);

  return {
    createdAt: order.createdAt,
    backHref: "/user/orders",
    referenceNumber: order.orderNumber,
    referenceLabel: "Sipariş Numarası",
    statusLabel: ORDER_DISPLAY_LABELS[displayStatus],
    statusColor: ORDER_DISPLAY_COLORS[displayStatus],
    metaItems: [
      `${order.products.length} Ürün`,
      `Satıcı ${order.sellerName}`,
    ],
    currency: order.currency,
    totalAmount: String(order.totalAmount),
    totalLabel: "Toplam Tutar",
  };
}

export function raffleToDetailHeader(raffle: Raffle): DetailHeaderData {
  const displayStatus = getRaffleDisplayStatus(raffle.status);

  return {
    createdAt: raffle.createdAt,
    backHref: "/user/raffles",
    referenceNumber: raffle.id,
    referenceLabel: "Çekiliş ID",
    statusLabel: RAFFLE_DISPLAY_LABELS[displayStatus],
    statusColor: RAFFLE_DISPLAY_COLORS[displayStatus],
    metaItems: [
      `${raffle.productCount} Ürün`,
      `${raffle.participationCount} Katılımcı`,
      raffle.creator.name,
    ],
    totalAmount: raffle.totalCost ?? undefined,
    totalLabel: "Toplam Maliyet",
  };
}