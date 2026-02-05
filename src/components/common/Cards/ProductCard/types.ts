import { Offer, Product } from "@/types/types";

enum ProductCardType {
  MOBILE = "mobile",
  DESKTOP = "desktop",
}

enum ProductCardOrientation {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
}
export interface AddToCartPayload {
  action: string;
  offerId: number;
  count: number;
  isBuyNow: boolean;
}

export interface NotifyWhenAvailablePayload {
  productId: number;
  userId: number;
}

export interface ChangeQuantityPayload {
  action: string;
  offerId: number;
}

export { ProductCardType, ProductCardOrientation };
