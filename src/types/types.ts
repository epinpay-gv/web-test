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

  // TODO : alttaki alanlar id ile tutuluyor ama fronta string olarak gelecek
  category: string;
  region: string;
  platform: string;
  type: string;

  status: PRODUCT_STATUS;
  translation: ProductTranslation;

  //TODO : walleta göre bu typeları değiştir:
  basePrice: number | null;
  epPrice: number | null;
  discountRate?: number;
  fakePrice?: number;
}

export interface Translation {
  id: number;
  typeId: number;
  locale: string;
  name: string;
}
export interface ProductTranslation extends Translation {
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
  translations: CategoryTranslation;
}

export interface CategoryTranslation extends Translation {
  slug: string;
  description: string;
  bannerImageUrl: string;
  bannerImageAlt: string;
  bannerImageStatus: string;
  imgUrl: string;
  imgAlt: string;
  metaTitle: string;
  metaDescription: string;
}
