import { OrderProduct } from "@/features/user/user.types";
import { ReactNode } from "react";

/* SEO */
export interface PageMetadata {
  id: number;
  pageId: number;
  slug: string;
  locale: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
}

export interface FAQ {
  id: number;
  name: string;
  description: string;
}

/* COMMON */
export interface PaginationData {
  count: number;
  per_page: number;
  current_page: number;
  total_page: number;
  has_more: boolean;
}

export interface BreadcrumbItem {
  name: string;
  href: string; // relative: /products
}

export interface BreadcrumbItemType {
  name: string;
  href: string;
  icon?: ReactNode;
}

/* PRODUCT */
export enum PRODUCT_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum CATEGORY_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
export interface Product {
  id: number;
  category_id: number;
  region_id: number;
  platform_id: number;
  type_id: number;
  status: PRODUCT_STATUS;
  quantity?: number;
  region: string;
  platform: string;
  platform_icon: string;
  type: string;
  genres: { id: number; name: string }[];

  translation: ProductTranslation;

  cheapestOffer?: Offer | null;
  basePrice: number | null;
  epPrice: number | null;
  discountRate?: number;
  fakePrice?: number | null;
  totalStock: number | null; // ! bu backende eklenmeli - seo için

  isFavorite?: boolean;
}

export interface Translation {
  id: number;
  // typeId: number; // ! bu bana lazım değil
  locale: string;
  name: string;
}
export interface ProductTranslation extends Translation {
  category_slug: string; // ! bu backende eklenmeli
  slug: string;
  description: string; 
  metaTitle: string;
  metaDescription: string;
  imgUrl: string;
  imgAlt: string;

  activation?: string; // ! bu backende eklenmeli
  faq?: FAQ[]; // ! bu backende eklenmeli
  comments?: Comment[]; // ! bu backende eklenmeli
}
export interface ProductRegion {
  id: number;
  translation: Translation;
}
export interface ProductPlatform {
  id: number;
  translation: Translation;
  icon: string;
}

export interface ProductType {
  id: number;
  translation: Translation;
}

/* CATEGORY */
export interface Category {
  id: number;
  status: CATEGORY_STATUS;
  translation: CategoryTranslation;
}

export interface CategoryTranslation extends Translation {
  slug: string;
  description: string;
  activation?: string; // ! bu backende eklenmeli
  faq?: FAQ[]; // ! bu backende eklenmeli
  comments?: Comment[]; // ! bu backende eklenmeli

  // bannerImageUrl: string; // ! yeni yapıda buna gerek olmayabilir
  // bannerImageAlt: string; // ! yeni yapıda buna gerek olmayabilir
  // bannerImageStatus: string; // ! yeni yapıda buna gerek olmayabilir
  imgUrl: string;
  imgAlt: string;
  metaTitle: string;
  metaDescription: string;
}

export interface Offer {
  id: number;
}

export interface Comment {
  id: number;
  name: string;
  surname: string;
  rate: number;
  comment: string;
  store_name: string;
  createdAt: string;
}

/* RAFFLE */

/* ---------- Enums ---------- */

export enum RaffleType {
  FREE = "FREE",
  EP = "EP",
  COUPON = "COUPON",
  MIXED = "MIXED",
}

export enum RaffleStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  DRAWING = "DRAWING",
  DRAWN = "DRAWN",
  ANNOUNCED = "ANNOUNCED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum CreatorType {
  STORE = "STORE",
  PUBLISHER = "PUBLISHER",
  PLATFORM = "PLATFORM",
}

export enum ParticipationConstraint {
  EVERYONE = "EVERYONE",
  PREMIUM = "PREMIUM",
  REFERENCE = "REFERENCE",
  FOLLOWER = "FOLLOWER",
  ROLE = "ROLE",
}

export enum ParticipationStatus {
  JOINED = "JOINED",
  ASIL_PENDING = "ASIL_PENDING",
  ASIL_APPROVED = "ASIL_APPROVED",
  ASIL_EXPIRED = "ASIL_EXPIRED",
  YEDEK_WAITING = "YEDEK_WAITING",
  YEDEK_PROMOTED = "YEDEK_PROMOTED",
  WON = "WON",
  LOST = "LOST",
}

/* ---------- Core Models ---------- */

export interface Raffle {
  id: string;
  title: string;
  description?: string | null;
  type: RaffleType; 
  status: RaffleStatus;

  startDate: string;
  endDate: string;

  constraint: ParticipationConstraint; 
  //   allowedRoles: string[]; // ! Bu bana lazım değil

  currencyId: number; 
  totalCost: string; 

  epCost?: number | null;
  couponType?: string | null;

  //   maxWinners: number;  // ! Bu bana lazım değil
  //   backupWinnerCount: number; // ! Bu bana lazım değil

  creatorType: CreatorType;
  creatorId: string;
  creator: {
    name: string;
    image: string;
  }; // ! bu backende eklenmeli

  drawDate?: string | null; 
  announceDate?: string | null;
  createdAt: string;
  updatedAt: string;

  rewards?: RaffleReward[];
  participations?: Participation[];
  pool?: RafflePool[];
  // logs?: RaffleLog[]; // ! Bu bana lazım değil

  participationCount: number; // ! bu backende eklenmeli
  productCount: number; // ! bu backende eklenmeli
  categoryCount: number; // ! bu backende eklenmeli

}

export interface RaffleReward {
  id: string;
  raffleId: string;
  name: string;
  quantity: number;
  image?: string | null;
  value?: string | null;

  productId?: string | null;
  offerId?: string | null;

  product: OrderProduct; // ! bu backende eklenmeli
}

export interface RafflePool {
  id: string;
  raffleId: string;
  offerId: string;
  stockId: number;

  winnerId?: string | null;
  claimedAt?: string | null;
  winnerName: string; // ! bu backende eklenmeli

  createdAt: string;
}

export interface Participation {
  id: string;
  raffleId: string;
  userId: string;
  userName: string; // ! bu backende eklenmeli

  ticketNumber: number;
  status: ParticipationStatus;

  costType: RaffleType;
  costValue?: number | null;
  couponCode?: string | null;

  joinedAt: string;
  ipAddress?: string | null;

  approvedAt?: string | null;
  lastViewedAt?: string | null;
}
