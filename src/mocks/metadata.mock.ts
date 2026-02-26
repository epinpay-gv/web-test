import { PageMetadata } from "@/types/types";

export const mockMetadata: PageMetadata[] = [
  {
    id: 1,
    pageId: 1, // Mainpage
    slug: "/",
    locale: "tr",
    title: "Güvenilir ve Hızlı Teslimatın Tek Adresi | Epinpay",
    metaTitle: "Epinpay",
    metaDescription: "Güvenli ve hızlı alışverişin tek adresi",
  },
  {
    id: 2,
    pageId: 1, // Mainpage
    slug: "/",
    locale: "en",
    title: "The only address for reliable and fast delivery | Epinpay",
    metaTitle: "Epinpay",
    metaDescription: "The only address for reliable and fast delivery",
  },
  {
    id: 1,
    pageId: 1, // Products sayfası
    slug: "/products",
    locale: "tr",
    title: "Ürünler | Epinpay",
    metaTitle: "Epinpay",
    metaDescription: "Ürünler",
  },
  {
    id: 2,
    pageId: 1, // Products sayfası
    slug: "/products",
    locale: "en",
    title: "Products | Epinpay",
    metaTitle: "Epinpay",
    metaDescription: "Products",
  },
];
