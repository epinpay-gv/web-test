import { Product, TopupFormField, TopupFormType } from "@/types/types";
export type { TopupFormField, TopupFormType };
import { RaffleFormData } from "@/features/raffles/raffle.types";

export type CartStep = "empty" | "items" | "delivery" | "payment" | "success";


export interface TopupItemInfo {
  formTypeCode: string;
  formData: Record<string, string>;
}

export interface CartItem extends Product {
  offerId: string;
  unitPrice: number;
  totalPrice: number;
  quantity: number;
  seller?: string;
  formType?: TopupFormType | null;
}

export interface InvoiceForm {
  name: string;
  surname: string;
  country: string;
  city: string;
}

export type PaymentMethodStatus = "active" | "disabled";

export interface PaymentMethodOption {
  label: string;
  value: string;
}

export interface PaymentMethodOptions {
  paymentMethod?: PaymentMethodOption[];
  currencyId?: PaymentMethodOption[];
  cryptoNetwork?: PaymentMethodOption[];
  cryptoToCurrency?: PaymentMethodOption[];
}

export interface PaymentMethod {
  id: string;
  name: string;
  slug: string;
  commission: string;
  description: string;
  icon: string;
  status: PaymentMethodStatus;
  requiredFields: string[];
  options: PaymentMethodOptions;
}

export type ResultType = "success" | "fail";

export interface OrderInvoice {
  name: string;
  surname: string;
  country: string;
  city: string;
}

export interface OrderedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderSummaryData {
  product_total: number;
  commission: number;
  taxes: number;
  total: number;
}

export interface OrderAuthRequest {
  order_id: string;
  email: string;
  userId?: string;
}

export interface OrderErrors {
  email?: boolean;
  agreement?: boolean;
}

export interface CartErrors {
  email?: boolean;
  agreement?: boolean;
}

export type PaymentContext = "balance" | "checkout" | "raffle";

/* RESPONSE & PAYLOAD TYPES */
export interface CartSummary {
  productTotal: number;
  taxes: number;
}

export interface CartResponse {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  step: CartStep;
  summary: CartSummary;
}
export interface BalancePaymentPayload {
  context: "balance";
  paymentMethodId: string;
  amountToLoad: number;
  currencyId?: number;
  paymentMethod?: string;
  cryptoNetwork?: string;
  cryptoToCurrency?: string;
}

export interface CartPaymentPayload {
  context: "checkout";
  paymentMethodId: string;
  guestEmail?: string;
  paymentMethod?: string;
  currencyId?: number;
  cryptoNetwork?: string;
  cryptoToCurrency?: string;
  topupInfo?: Record<string, TopupItemInfo>;
}

export type PaymentPayload = BalancePaymentPayload | CartPaymentPayload | RafflePaymentPayload;

export interface PaymentLinkResponse {
  paylink: string;
}

export interface OrderDetailResponse {
  order_id: string;
  status: ResultType;
  date: string;
  payment_method: string;
  user_info: {
    userId: string;
    is_guest: boolean;
    email: string;
  };
  products: Product[];
  invoice: OrderInvoice | null;
  summary: OrderSummaryData;
}


export interface RafflePaymentPayload {
  context: "raffle";
  paymentMethodId: string;
  raffleData: RaffleFormData; 
  paymentMethod?: string;
  currencyId?: number;
  cryptoNetwork?: string;
  cryptoToCurrency?: string;
}