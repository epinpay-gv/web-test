import { OrderStatus, OrderItemStatus, InvoiceStatus, ProductCategory } from "@/features/user/user.types";
import { RaffleStatus } from "@/types/types";

// ─── Shared ───────────────────────────────────────────────────────────────────

export const STATUS_COLORS = {
  SUCCESS: "text-(--text-fg-success-strong)",
  WARNING: "text-(--text-fg-warning)",
  DANGER:  "text-(--text-fg-danger-strong)",
} as const;

// ─── Display Status Types ─────────────────────────────────────────────────────

// Three-bucket system — every entity maps into one of these
// so the DetailPageHeader only needs to know SUCCESS | WARNING | DANGER
export type DisplayStatus = "COMPLETED" | "CANCELLED" | "PENDING";

export type RaffleDisplayStatus =
  | "DRAFT"
  | "ACTIVE"
  | "DRAWING"
  | "COMPLETED"
  | "CANCELLED"
  | "ANNOUNCED";

// ─── Order ────────────────────────────────────────────────────────────────────

export function getOrderDisplayStatus(status: OrderStatus | string): DisplayStatus {
  if (status === "COMPLETED") return "COMPLETED";
  if (
    status === "CANCELLED" ||
    status === "TIMEOUT"   ||
    status === "PAYMENT_FAILED"
  ) return "CANCELLED";
  return "PENDING";
}

export const ORDER_DISPLAY_LABELS: Record<DisplayStatus, string> = {
  COMPLETED: "Tamamlandı",
  CANCELLED: "İptal Edildi",
  PENDING:   "Beklemede",
};

export const ORDER_DISPLAY_COLORS: Record<DisplayStatus, string> = {
  COMPLETED: STATUS_COLORS.SUCCESS,
  CANCELLED: STATUS_COLORS.DANGER,
  PENDING:   STATUS_COLORS.WARNING,
};

// ─── Order Item ───────────────────────────────────────────────────────────────

export type ItemDisplayStatus = "DELIVERED" | "CANCELLED" | "PENDING";

export function getItemDisplayStatus(status: OrderItemStatus | string): ItemDisplayStatus {
  if (status === "COMPLETED" || status === "DISPUTED") return "DELIVERED";
  if (status === "CANCELLED" || status === "TIMEOUT")  return "CANCELLED";
  return "PENDING";
}

export const ITEM_DISPLAY_LABELS: Record<ItemDisplayStatus, string> = {
  DELIVERED: "Teslim Edildi",
  CANCELLED: "İptal Edildi",
  PENDING:   "Beklemede",
};

export const ITEM_DISPLAY_COLORS: Record<ItemDisplayStatus, string> = {
  DELIVERED: STATUS_COLORS.SUCCESS,
  CANCELLED: STATUS_COLORS.DANGER,
  PENDING:   STATUS_COLORS.WARNING,
};

// ─── Raffle ───────────────────────────────────────────────────────────────────

// DRAWING and DRAWN both mean "in progress" from the user's perspective
// ANNOUNCED means winners are out but not yet fully completed
export function getRaffleDisplayStatus(status: RaffleStatus): RaffleDisplayStatus {
  if (status === RaffleStatus.COMPLETED)                           return "COMPLETED";
  if (status === RaffleStatus.CANCELLED)                           return "CANCELLED";
  if (status === RaffleStatus.ANNOUNCED)                           return "ANNOUNCED";
  if (status === RaffleStatus.DRAWING || status === RaffleStatus.DRAWN) return "DRAWING";
  if (status === RaffleStatus.ACTIVE)                              return "ACTIVE";
  return "DRAFT"; // DRAFT
}

export const RAFFLE_DISPLAY_LABELS: Record<RaffleDisplayStatus, string> = {
  DRAFT:     "Taslak",
  ACTIVE:    "Aktif",
  DRAWING:   "Çekiliş Yapılıyor",
  ANNOUNCED: "Kazananlar Açıklandı",
  COMPLETED: "Tamamlandı",
  CANCELLED: "İptal Edildi",
};

export const RAFFLE_DISPLAY_COLORS: Record<RaffleDisplayStatus, string> = {
  DRAFT:     STATUS_COLORS.WARNING,
  ACTIVE:    STATUS_COLORS.SUCCESS,
  DRAWING:   STATUS_COLORS.WARNING,
  ANNOUNCED: STATUS_COLORS.WARNING,
  COMPLETED: STATUS_COLORS.SUCCESS,
  CANCELLED: STATUS_COLORS.DANGER,
};

// ─── Invoice & Product Category (non-display-status, but belong here) ─────────

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  NONE:      "Fatura Yok",
  REQUESTED: "Fatura Talep Edildi",
  APPROVED:  "Fatura Onaylandı",
};

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  DIGITAL_KEY: "Digital key",
  GIFT_CARD:   "Gift card",
  TOP_UP:      "Top-up",
};