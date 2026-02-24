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
  createdAt: Date;
  sellerName: string;
  sellerIsVerified: boolean;
  invoiceStatus: InvoiceStatus;
  products: OrderProduct[];
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  COMPLETED: "Tamamlandı",
  PENDING: "Bekliyor",
  CANCELLED: "İptal edildi",
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  COMPLETED: "text-emerald-400",
  PENDING: "text-yellow-400",
  CANCELLED: "text-red-400",
};

export const CODE_STATUS_LABELS: Record<CodeStatus, string> = {
  DELIVERED: "Teslim edildi",
  CANCELLED: "İptal edildi",
  PENDING: "Beklemede",
};

export const CODE_STATUS_COLORS: Record<CodeStatus, string> = {
  DELIVERED: "text-emerald-400",
  CANCELLED: "text-red-400",
  PENDING: "text-yellow-400",
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

// mocks



export const mockOrders: Order[] = [
  {
    id: "order-1",
    orderNumber: "123456789",
    status: "COMPLETED",
    totalAmount: 1198,
    currency: "₺",
    createdAt: new Date("2026-01-25T12:30:00"),
    sellerName: "Epinpay",
    sellerIsVerified: true,
    invoiceStatus: "NONE",
    products: [
      {
        id: "prod-1",
        name: "Overwatch 2 - 10 Mythic Prisms",
        category: "DIGITAL_KEY",
        platform: "Battle.net",
        region: "Europe",
        price: 599,
        currency: "₺",
        imageUrl: "/images/overwatch2.jpg",
        status: "COMPLETED",
        codeStatus: "DELIVERED",
        code: "XXXX-XXXX-XXXX-XXXX",
        howToUseUrl: "#",
      },
      {
        id: "prod-2",
        name: "Zula 3000 Altın",
        category: "GIFT_CARD",
        platform: "Zula",
        region: "Turkey",
        price: 599,
        currency: "₺",
        imageUrl: "/images/zula.jpg",
        status: "CANCELLED",
        codeStatus: "CANCELLED",
      },
    ],
  },
  {
    id: "order-2",
    orderNumber: "987654321",
    status: "COMPLETED", // ✅ düzeltildi
    totalAmount: 599,
    currency: "₺",
    createdAt: new Date("2026-02-01T10:00:00"),
    sellerName: "Store2 Name",
    sellerIsVerified: false,
    invoiceStatus: "REQUESTED",
    products: [
      {
        id: "prod-3",
        name: "Steam 100 TL",
        category: "GIFT_CARD",
        platform: "Steam",
        region: "Turkey",
        price: 599,
        currency: "₺",
        imageUrl: "/images/steam.jpg",
        status: "COMPLETED", // ✅ düzeltildi
        codeStatus: "PENDING",
        requiresActivation: true,
      },
    ],
  },
];