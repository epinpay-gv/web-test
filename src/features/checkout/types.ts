import { Product } from "@/types/types";

export type CartStep = 'empty' | 'items' | 'delivery' | 'payment' | 'success';

export interface CartItem extends Product {
  offerId: string;
  unitPrice: number;
  totalPrice: number;
  quantity: number;
  seller?: string;
}

export interface CartResponse {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  step: CartStep;
}

export interface InvoiceForm {
  name: string;
  surname: string;
  country: string;
  city: string;
}

export type PaymentMethodStatus = 'active' | 'disabled';

export interface PaymentMethod {
  id: string;
  name: string;
  commission: string;
  description: string;
  icon: string;
  status: PaymentMethodStatus;
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

export interface OrderDetailResponse {
  order_id: string;
  status: ResultType;
  date: string;
  payment_method: string;
  user_info: {
    userId: string,
    is_guest: boolean,
    email: string
  }
  products: Product[]
  invoice: OrderInvoice | null; 
  summary: OrderSummaryData;
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
