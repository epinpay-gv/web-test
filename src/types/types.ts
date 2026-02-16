import { ReactNode } from "react";

/* COMMON */
export interface PaginationData{
  count: number;
  per_page: number;
  current_page: number;
  total_page: number;
  has_more: boolean;
}

export type BreadcrumbItemType = {
  name: string;
  url: string;
  icon?: ReactNode;
};


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

  // * Alttaki değerler filtrelemede kullanılıyor, backendden isimleri de dönmeli
  category_id: number;
  region_id: number;
  platform_id: number;
  type_id: number;
  status: PRODUCT_STATUS;

  region: string;
  platform: string;
  platform_icon: string;
  type: string;

  translation: ProductTranslation;

  genres: {id: number; name: string;}[];

  cheapestOffer? : Offer | null;
  basePrice: number | null;
  epPrice: number | null;
  discountRate?: number;
  fakePrice?: number | null;

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
}
export interface ProductRegion {
  id: number;
  translation: Translation;
}
export interface ProductPlatform {
  id: number;
  translation: Translation;
}

export interface ProductType {
  id: number;
  translation: Translation;
}

export interface Category {
  id: number;
  status: CATEGORY_STATUS;
  translation: CategoryTranslation;
}

export interface CategoryTranslation extends Translation {
  slug: string;
  // description: string; // ! yeni yapıda buna gerek olmayabilir
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