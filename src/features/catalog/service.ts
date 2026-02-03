import { AddToCartPayload } from "@/components/common/Cards/ProductCard/types";
import { http } from "@/lib/http";

export function addToCartRequest(payload: AddToCartPayload) {
  return http.post("/cart/add", payload);
}
