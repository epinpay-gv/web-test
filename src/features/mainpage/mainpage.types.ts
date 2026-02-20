import { Product } from "@/types/types";

export interface Promoted {
  product: {
    name: string;
    slug: string;
  };
  productVariants: {
    id: number;
    name: string;
    price: number;
    slug: string;
  }[];
  categories: PromotedCategory[];
}

export interface PromotedCategory {
  id: number;
  title: string;
  slug: string;
  image: string;
}

export interface Bestsellers {
  tabInfo: { label: string; value: string }[];
  products: Product[];
}

export interface PremiumPlan {
    id: string;
    title: string;
    description: string;
    features: string[];
}

/* RESPONSE & PAYLOAD TYPES */

export interface MainPageApiResponse {
  promoted: Promoted;
  bestsellers: Bestsellers;
  premium: PremiumPlan[];
}
