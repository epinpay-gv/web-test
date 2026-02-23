export type CartStep = 'empty' | 'items' | 'delivery' | 'payment' | 'success';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartResponse {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  step: CartStep;
  guestId?: string;
}