export type CartStep = 'empty' | 'items' | 'delivery' | 'payment' | 'success';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}