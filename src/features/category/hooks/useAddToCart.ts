import { AddToCartPayload } from "@/components/common/Cards/ProductCard/types";
import { addToCartRequest } from "../service";

export function useAddToCart() {
  return async (payload: AddToCartPayload) => {
    try {
      await addToCartRequest(payload);
      // success state, toast, cache invalidate vs gelecek
    } catch (e) {
      // error handling gelecek
    }
  };
}