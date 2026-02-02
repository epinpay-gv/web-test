import { Product, Offer } from "@/types/types";

export interface ProductPageData extends Product {
  offers: Offer[];
}
