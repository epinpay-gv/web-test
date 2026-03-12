import { Raffle } from "@/components/common/Cards/RaffleCard/types";
import { FAQ, PageMetadata, PaginationData } from "@/types/types";
import { FilterGroupConfig } from "../filters/filters.types";

export interface BannerSectionData {
  id: string;
  name: string;
  image: string;
  raffle: Raffle | Raffle[];
}

export interface SliderSectionData {
  title: string;
  raffles: Raffle[];
  line: number;
}

export interface Winner {
  id: string;
  name: string;
  date: string;
}

/* RESPONSE & PAYLOAD TYPES */

export interface RafflesApiResponse {
  metadata: PageMetadata;
  data: {
    activeParticipantCount: number;
    winners: Winner[];
    faq: FAQ[];
    sliders: SliderSectionData[];
    banners: {
      featured: BannerSectionData;
      streamers: BannerSectionData[];
    };
  };
}

export interface AllRafflesApiResponse {
  metadata: PageMetadata;
  data: Raffle[];
  pagination: PaginationData;
  filters: FilterGroupConfig[];
}

export interface JoinRaffleApiPayload {
  raffleId: string;
}
