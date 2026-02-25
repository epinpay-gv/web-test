
enum ProductCardType {
  MOBILE = "mobile",
  DESKTOP = "desktop",
}

enum ProductCardOrientation {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
}

export interface ChangeQuantityPayload {
  productId: number | string; 
  offerId: number;             
  action: ChangeQuantityAction; 
  quantity?: number;          
}

export type ChangeQuantityAction = "increment" | "decrement" | "update" | "remove";

export { ProductCardType, ProductCardOrientation };
