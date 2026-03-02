// {
//     "success": true,
//     "data": {
//         "id": "EQPLglo6IvaUQ5ZYhEoGY9OdRxf1",
//         "email": "test@gmail.com",
//         "phone": null,
//         "firstName": null,
//         "lastName": null,
//         "birthdate": null,
//         "isIdentityVerified": false,
//         "roles": [
//             "USER"
//         ],
//         "createdAt": "2026-02-17T09:06:23.018Z",
//         "updatedAt": "2026-02-17T09:06:23.018Z"
//     }
// }

import { PaginationData } from "@/types/types";


export type UserRole = "USER"

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


export interface OrdersPageApiResponse {
  data: Order[];
  pagination: PaginationData;
}

export type OrderStatus = "PENDING_PAYMENT" | "PAYMENT_SUCCESS" | "COMPLETED" | "CANCELLED" | "TIMEOUT" | "PAYMENT_FAILED";
export type OrderItemStatus =
  | "PENDING_PAYMENT"
  | "PAID"
  | "EPIN_READY"
  | "AWAITING_DELIVERY"
  | "DELIVERED"
  | "COMPLETED"
  | "DISPUTED";

export type InvoiceStatus = "NONE" | "REQUESTED" | "APPROVED";
export type ProductCategory = "DIGITAL_KEY" | "GIFT_CARD" | "TOP_UP";
export type ItemType = "NORMAL" | "DROPSHIPPING" | "TOP_UP";

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
  storeCode?: string; // Still useful for some internal checks if needed
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
  NEUTRAL: "text-(--text-body)",
} as const;

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING_PAYMENT: "Ödeme Bekleniyor",
  PAYMENT_SUCCESS: "Ödeme Başarılı",
  COMPLETED: "Tamamlandı",
  CANCELLED: "İptal Edildi",
  TIMEOUT: "Zaman Aşımı",
  PAYMENT_FAILED: "Ödeme Başarısız",
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING_PAYMENT: STATUS_COLORS.WARNING,
  PAYMENT_SUCCESS: STATUS_COLORS.SUCCESS,
  COMPLETED: STATUS_COLORS.SUCCESS,
  CANCELLED: STATUS_COLORS.DANGER,
  TIMEOUT: STATUS_COLORS.DANGER,
  PAYMENT_FAILED: STATUS_COLORS.DANGER,
};

export const ITEM_STATUS_LABELS: Record<OrderItemStatus, string> = {
  PENDING_PAYMENT: "Ödeme Bekleniyor",
  PAID: "Ödendi",
  EPIN_READY: "EPIN Hazır",
  AWAITING_DELIVERY: "Teslimat Bekleniyor",
  DELIVERED: "Teslim Edildi",
  COMPLETED: "Tamamlandı",
  DISPUTED: "İtiraz Edildi",
};

export const ITEM_STATUS_COLORS: Record<OrderItemStatus, string> = {
  PENDING_PAYMENT: STATUS_COLORS.WARNING,
  PAID: STATUS_COLORS.SUCCESS,
  EPIN_READY: STATUS_COLORS.SUCCESS,
  AWAITING_DELIVERY: STATUS_COLORS.WARNING,
  DELIVERED: STATUS_COLORS.SUCCESS,
  COMPLETED: STATUS_COLORS.SUCCESS,
  DISPUTED: STATUS_COLORS.DANGER,
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

export const ORDER_STATUS_TABS: ("ALL" | OrderStatus)[] = [
  "ALL",
  "COMPLETED",
  "PENDING_PAYMENT",
  "CANCELLED",
];
