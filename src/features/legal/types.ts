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
