import { Product, Offer, PaginationData } from "@/types/types";

export interface ProductPageData extends Product {
  offers: Offer[];
}

export interface ProductPageResponse extends PaginationData {
  data: ProductPageData[];
}
