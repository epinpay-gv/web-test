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
  isBuyNow : boolean;
}

export interface NotifyWhenAvailablePayload {
  productId: number;
  userId: number;
}

export { ProductCardType, ProductCardOrientation };
