import { Product } from "@/types/types";

export type CartStep = 'empty' | 'items' | 'delivery' | 'payment' | 'success';
export interface CartItem extends Product {
  quantity: number;
  seller?: string;
}

export interface CartResponse {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  step: CartStep;
}