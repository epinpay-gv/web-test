import { PageMetadata, Product } from "@/types/types";
import { BannerSectionData, SliderSectionData } from "../raffles/raffle.types";
import { BasicStreamer } from "../streamers/streamers.types";

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
  products: { [key: string]: Product[] };
}

export interface PremiumPlan {
    id: string;
    title: string;
    description: string;
    features: string[];
}

export interface MainPageData {
  promoted: Promoted;
  bestsellers: Bestsellers;
  premium: PremiumPlan[];
  streamerRaffles: BannerSectionData[];
  epinpayRaffles : SliderSectionData;
  epinpayStreamers: BasicStreamer[];
}


/* RESPONSE & PAYLOAD TYPES */

export interface MainPageApiResponse {
  metadata: PageMetadata;
  data: MainPageData;
}
