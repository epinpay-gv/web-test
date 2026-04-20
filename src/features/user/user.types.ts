import { PaginationData, Raffle } from "@/types/types";
import { FilterGroupConfig } from "../filters/filters.types";

// User
export type UserRole = "USER" | "ADMIN";

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

// Common
export interface DetailHeaderData {
  createdAt: string;
  backHref: string;
  referenceNumber: string;
  referenceLabel: string;
  statusLabel: string;
  statusColor: string;
  metaItems: string[];
  currency?: string;
  totalAmount?: string;
  totalLabel?: string;
}

// Settings
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

// Orders
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

// balance
export interface BalanceHistory {
  id: string;
  method: string;
  date: string;
  amount: string;
  currency: string;
}

/* RESPONSE & PAYLOAD TYPES */
// orders
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

// raffles
export interface RafflesPageApiResponse {
  data: Raffle[];
  pagination: PaginationData;
  filters: FilterGroupConfig[];
}

export interface RaffleDetailPageApiResponse {
  data: Raffle;
}

//balance
export interface BalanceHistoryApiResponse {
  data: BalanceHistory[];
  pagination: PaginationData;
}

/* =========================================================
   BFF TYPES — /api/features/user/*
   ========================================================= */

// GET /api/features/user/me
export interface UserMeResponse {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  initials: string | null;
  isIdentityVerified: boolean;
  roles: UserRole[];
  referralCode: string | null;
  wallet: {
    currencyId: number;
    balance: number;
    currencyName: string;
  } | null;
  epBalance: number | null;
}

// GET /api/features/user/wallet
export interface WalletDepositHistory {
  id: string;
  amount: number;
  date: string;
}

export interface WalletApiResponse {
  wallet: {
    id: number;
    balance: number;
    currencyId: number;
  };
  depositHistory: WalletDepositHistory[];
}

// GET /api/features/user/wallet/deposit-page
export interface WalletDepositPageApiResponse {
  wallet: {
    balance: number;
    currencyName: string;
  } | null;
  paymentMethods: unknown[];
  depositHistory?: WalletDepositHistory[];
}

// GET /api/features/user/orders
export type BffOrderItemType = "epin" | "topup";

export interface BffOrderItem {
  id: string;
  offerId: string;
  productName: string | null;
  productImage: string | null;
  typeCode: string | null;
  itemType: BffOrderItemType;
  price: number;
  quantity: number;
  status: string;
  canViewEpin: boolean;
  canConfirm: boolean;
  canDispute: boolean;
  isDisputed: boolean;
}

export interface BffOrderSeller {
  storeId: string;
  storeName: string | null;
  items: BffOrderItem[];
}

export interface BffOrderFirstItem {
  offerId: string;
  productName: string;
  productImage: string;
  itemType: string;
  status: string;
  quantity: number;
}

export interface BffOrder {
  id: string;
  status: string;
  orderType: string;
  date: string;
  totalAmount: string;
  currencyCode: string;
  paymentMethodId: string;
  itemCount: number;
  firstItem: BffOrderFirstItem;
  storeNames: string[];
  sellers?: BffOrderSeller[];
}

export interface BffOrdersMeta {
  page: number;
  limit: number;
  total: number;
}

export interface BffOrdersPageApiResponse {
  orders: BffOrder[];
  meta: BffOrdersMeta;
}

// GET /api/features/user/orders/:orderId
export type BffOrderDetailApiResponse = BffOrder;

// POST /api/features/user/orders/:orderId/items/:itemId/dispute
export interface DisputePayload {
  reason: string;
}
