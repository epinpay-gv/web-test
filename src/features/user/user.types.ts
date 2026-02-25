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


export interface OrdersPageOrder {
  id: number;
  order_no: string;
  items: [];
  status: "" | "";
  product_amount: number;
  total_amount: number;
  created_at: string;
}

export interface OrdersPageApiResponse{
    data: OrdersPageOrder[];
    pagination: PaginationData;
}

export type OrderStatus = "COMPLETED" | "PENDING" | "CANCELLED";
export type InvoiceStatus = "NONE" | "REQUESTED" | "APPROVED";
export type CodeStatus = "DELIVERED" | "CANCELLED" | "PENDING";
export type ProductCategory = "DIGITAL_KEY" | "GIFT_CARD" | "TOP_UP";

export interface OrderProduct {
  id: string;
  name: string;
  description?: string;
  category: ProductCategory;
  platform?: string;
  region?: string;
  price: number;
  currency: string;
  imageUrl: string;
  status: OrderStatus;
  codeStatus?: CodeStatus;
  code?: string;
  howToUseUrl?: string;
  requiresActivation?: boolean;
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
  COMPLETED: "text-(--text-fg-success-strong)",
  DELIVERED: "text-(--text-fg-success-strong)",
  PENDING: "text-(--text-fg-warning)",
  CANCELLED: "text-(--text-fg-danger-strong)",
} as const;

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  COMPLETED: "Tamamlandı",
  PENDING: "Beklemede",
  CANCELLED: "İptal edildi",
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  COMPLETED: STATUS_COLORS.COMPLETED,
  PENDING: STATUS_COLORS.PENDING,
  CANCELLED: STATUS_COLORS.CANCELLED,
};

export const CODE_STATUS_LABELS: Record<CodeStatus, string> = {
  DELIVERED: "Teslim edildi",
  CANCELLED: "İptal edildi",
  PENDING: "Beklemede",
};

export const CODE_STATUS_COLORS: Record<CodeStatus, string> = {
  DELIVERED: STATUS_COLORS.DELIVERED,
  PENDING: STATUS_COLORS.PENDING,
  CANCELLED: STATUS_COLORS.CANCELLED,
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
  "PENDING",
  "CANCELLED",
];