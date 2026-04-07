import { PageMetadata, PaginationData } from "@/types/types";

/* CARD BASE */
export interface BlogCard {
  id: number;
  slug: string;
  locale: string;

  title: string;
  description: string;

  thumbnail: string;

  publishedAt: string;
  viewCount: number;
}

/* HERO */
export interface BlogHeroSection {
  featured: BlogCard;
  sideList: BlogCard[];
}

/* POPULAR */
export interface BlogPopularItem {
  id: number;
  slug: string;
  locale: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  rank: number;
}

/* LIST PAGE  */
export interface BlogListPageData {
  hero: BlogHeroSection;
  popular: BlogPopularItem[];
  blogs: BlogCard[];
}

/* DETAIL PAGE */
export interface BlogDetailSection {
  title?: string;
  content?: string;
  image?: string;
}

export interface BlogDetail {
  id: number;
  slug: string;
  locale: string;
  title: string;
  description: string;
  thumbnail?: string;
  publishedAt: string;
  content?: string;
  sections: BlogDetailSection[];
  relatedPosts: BlogCard[];
}

/* RESPONSE & PAYLOAD TYPES */

export interface BlogApiResponse {
  metadata: PageMetadata;
  data: BlogListPageData;
  pagination: PaginationData;
}

export interface ArticleApiResponse {
  metadata: PageMetadata;
  data: { data: BlogDetail; popular: BlogCard[] };
}
