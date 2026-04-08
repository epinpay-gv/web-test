import { PageMetadata } from "@/types/types";

export type LegalDocumentType =
  | "terms-of-use"
  | "aml-kyc-policy"
  | "privacy-policy"
  | "kvkk"
  | "refund-policy"
  | "advertising-policy";

export interface LegalContentBlock {
  id: string;
  title?: string;
  content: string;
}

export interface LegalDocument {
  id: string;
  type: LegalDocumentType;
  title: string;
  description?: string;
  blocks: LegalContentBlock[];
  publishedAt: string;
  updatedAt?: string;
}

/* RESPONSE & PAYLOAD TYPES */
export interface AboutPageApiResponse {
  data: string;
  metadata: PageMetadata;
}

export interface LegalPageApiResponse {
  data: LegalDocument;
  metadata: PageMetadata;
}