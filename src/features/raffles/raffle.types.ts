import { FAQ, PageMetadata, PaginationData, ParticipationConstraint, Raffle } from "@/types/types";
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

export interface TakeRafflePriceApiPayload{
  raffleId: string;
}

export type RaffleStep = "info" | "prize" | "payment";

export interface RaffleFormData {
  title: string;
  description: string;
  type: "free" | "ep" | "coupon";
  prizeCount: number;
  backupCount: number;
  constraint?: ParticipationConstraint;
}

export interface SectionProps {
  data: RaffleFormData;
  onUpdate: (newData: Partial<RaffleFormData>) => void;
  onNext: () => void;
  onPrev?: () => void;
}