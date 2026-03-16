import { PaginationData } from "@/types/types";
import { FilterGroupConfig } from "../filters/filters.types";
import { Raffle } from "@/components/common/Cards/RaffleCard/types";

export type UserRole = "USER";

export interface User {
  id: string;
  email: string;
  phone: string | null;
  firstName: string | null;
  lastName: string | null;
  birthdate: string | null;
  isIdentityVerified: boolean;
  roles: UserRole[];
  createdAt: string;
  updatedAt: string;
}

export interface GetMeResponse {
  success: boolean;
  data: User;
}

export type OrderStatus =
  | "PENDING_PAYMENT"
  | "PAYMENT_SUCCESS"
  | "COMPLETED"
  | "CANCELLED"
  | "TIMEOUT"
  | "PAYMENT_FAILED";

export type ItemType = "NORMAL" | "DROPSHIPPING" | "TOP_UP";

export type OrderItemStatus =
  | "PENDING_PAYMENT"
  | "PAID"
  | "EPIN_READY"
  | "AWAITING_DELIVERY"
  | "DELIVERED"
  | "COMPLETED"
  | "DISPUTED"
  | "TIMEOUT"
  | "CANCELLED";

export type InvoiceStatus = "NONE" | "REQUESTED" | "APPROVED";
export type ProductCategory = "DIGITAL_KEY" | "GIFT_CARD" | "TOP_UP";

export interface OrderProduct {
  id: string;
  name: string;
  description?: string;
  category: ProductCategory;
  itemType: ItemType;
  platform?: string;
  region?: string;
  price: number;
  currency: string;
  imageUrl: string;
  status: OrderItemStatus;
  code?: string;
  howToUseUrl?: string;
  requiresActivation?: boolean;
  deliveryDeadline?: string;
  viewedAt?: string;
  storeCode?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  totalAmount: number;
  currency: string;
  createdAt: string;
  sellerName: string;
  sellerIsVerified: boolean;
  invoiceStatus: InvoiceStatus;
  products: OrderProduct[];
}

const STATUS_COLORS = {
  SUCCESS: "text-(--text-fg-success-strong)",
  WARNING: "text-(--text-fg-warning)",
  DANGER: "text-(--text-fg-danger-strong)",
} as const;

// Sipariş Listesi

export type OrderDisplayStatus = "COMPLETED" | "CANCELLED" | "PENDING";

export function getOrderDisplayStatus(status: OrderStatus): OrderDisplayStatus {
  if (status === "COMPLETED") return "COMPLETED";
  if (
    status === "CANCELLED" ||
    status === "TIMEOUT" ||
    status === "PAYMENT_FAILED"
  )
    return "CANCELLED";
  return "PENDING";
}

export const ORDER_DISPLAY_LABELS: Record<OrderDisplayStatus, string> = {
  COMPLETED: "Tamamlandı",
  CANCELLED: "İptal Edildi",
  PENDING: "Beklemede",
};

export const ORDER_DISPLAY_COLORS: Record<OrderDisplayStatus, string> = {
  COMPLETED: STATUS_COLORS.SUCCESS,
  CANCELLED: STATUS_COLORS.DANGER,
  PENDING: STATUS_COLORS.WARNING,
};

export type ItemDisplayStatus = "DELIVERED" | "CANCELLED" | "PENDING";

export function getItemDisplayStatus(
  status: OrderItemStatus,
): ItemDisplayStatus {
  if (status === "COMPLETED" || status === "DISPUTED") return "DELIVERED";
  if (status === "CANCELLED" || status === "TIMEOUT") return "CANCELLED";
  return "PENDING";
}

export const ITEM_DISPLAY_LABELS: Record<ItemDisplayStatus, string> = {
  DELIVERED: "Teslim Edildi",
  CANCELLED: "İptal Edildi",
  PENDING: "Beklemede",
};

export const ITEM_DISPLAY_COLORS: Record<ItemDisplayStatus, string> = {
  DELIVERED: STATUS_COLORS.SUCCESS,
  CANCELLED: STATUS_COLORS.DANGER,
  PENDING: STATUS_COLORS.WARNING,
};

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  NONE: "Fatura Yok",
  REQUESTED: "Fatura Talep Edildi",
  APPROVED: "Fatura Onaylandı",
};

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  DIGITAL_KEY: "Digital key",
  GIFT_CARD: "Gift card",
  TOP_UP: "Top-up",
};

export type OrderStatusTab = "ALL" | "COMPLETED" | "PENDING" | "CANCELLED";

export const ORDER_STATUS_TABS: OrderStatusTab[] = [
  "ALL",
  "COMPLETED",
  "PENDING",
  "CANCELLED",
];

export const ORDER_STATUS_TAB_LABELS: Record<OrderStatusTab, string> = {
  ALL: "Tümü",
  COMPLETED: "Tamamlanan",
  PENDING: "Bekleyen",
  CANCELLED: "İptal Edilen",
};

export function resolveStatusParams(tab: OrderStatusTab): string[] {
  if (tab === "PENDING") return ["PENDING_PAYMENT", "PAYMENT_SUCCESS"];
  if (tab === "ALL") return [];
  return [tab];
}

/* USER */

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  referralCode: string;
  isEmailVerified: boolean;
};

export type UserProfileSectionContent = {
  title: string;
  description: string;
};

//  Kullanıcı Ayarları
export interface UserSettingsDTO {
  system: {
    country: string;
    currency: string;
  };
  notifications: {
    email: boolean;
  };
}

export type CountryOption = {
  label: string;
  value: string;
};

export type CurrencyOption = {
  label: string;
  value: string;
};

/* RESPONSE & PAYLOAD TYPES */
// /orders page
export interface OrdersPageApiResponse {
  data: Order[];
  pagination: PaginationData;
  filters: FilterGroupConfig[];
}

export interface OrderDetailPageApiResponse {
  data: Order;
}

export interface TopupResponsePayload {
  status: "confirm" | "deny";
  denyReason?: string;
}

export interface TopupResponseResponse {
  success: boolean;
}

export interface RafflesPageApiResponse {
  data: Raffle[];
  pagination: PaginationData;
  filters: FilterGroupConfig[];
}

export interface RaffleDetailPageApiResponse {
  data: Raffle;
}