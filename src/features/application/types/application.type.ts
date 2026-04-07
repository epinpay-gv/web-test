export type ApplicationStatus =
  | "PENDING"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "REJECTED"
  | "REVISION_REQUESTED";

export interface ApplicationRecord {
  applicationId: string;
  fullName: string;
  email: string;
  createdAt: string;
  status: ApplicationStatus;
}

export interface ApplicationsApiResponse {
  data: ApplicationRecord[];
}