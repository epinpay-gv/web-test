import { Raffle } from "@/components/common/Cards/RaffleCard/types";
import { FAQ, PageMetadata, PaginationData } from "@/types/types";

export interface BannerSection {
  name: string;
  image: string;
  raffle: Raffle | Raffle[];
}

export interface SliderSection {
  title: string;
  raffles: Raffle[];
  line: number;
}

export interface Winner {
  name: string;
  date: string;
}

/* RESPONSE & PAYLOAD TYPES */

export interface RafflesApiResponse {
  metadata: PageMetadata[];
  data: {
    activeParticipantCount: number;
    winners: Winner[];
    faq: FAQ[];
    sliders: SliderSection[];
    banners: {
      featured: BannerSection;
      streamers: BannerSection[];
    };
  };
}

export interface AllRafflesApiResponse {
  metadata: PageMetadata[];
  data: Raffle[];
  pagination: PaginationData;
  //   filters: FilterGroupConfig[];
}
