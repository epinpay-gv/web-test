import { Product, Offer, PaginationData, Category } from "@/types/types";

export interface ProductPageData extends Product {
  offers: Offer[];
}

export interface ProductPageResponse extends PaginationData {
  data: ProductPageData[];
}

export interface CategoryPageData extends Category{
  smth: ""
}