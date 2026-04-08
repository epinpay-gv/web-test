import { PackageCriteria, Stream } from "@/features/streamers/streamers.types";
import { PageMetadata } from "@/types/types";

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


/* STREAMER APPLICATION (FORM PAGE) */

export interface PerformanceCriteriaItem extends Pick<PackageCriteria, "id"> {
  title: string;
  image: string;
  description: string;
}

export interface StreamerApplicationHero {
  title: string;
  description?: string;
}


export interface StreamerApplicationFormData {
  name: string;
  surname: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  twitchUrl: string;
  kickUrl: string;
  youtubeChannelUrl: string;
  contentType: string;
  targetAudience: string;
  weeklyStreamDays: string;
  dailyStreamHours: string;
  instagramUrl: string;
  tiktokUrl: string;
  youtubeSocialUrl: string;
}

export interface StreamerApplicationPayload {
  platform: "TWITCH" | "KICK" | "YOUTUBE";
  stream_url: string;
  full_name: string;
  email: string;
  phone: string;
  content_type: string;
  target_audience: string;
  streaming_schedule: string;
  youtube_url?: string;
  tiktok_url?: string;
  instagram_url?: string;
}
export interface StreamerApplicationResponse {
  success: boolean;
  message: string;
  applicationId: string;
}

export interface StreamerApplicationPageData {
  hero: StreamerApplicationHero;
  criteriaTitle: string;
  criteriaDescription: string;
  criteriaItems: PerformanceCriteriaItem[];
}

export interface StreamerApplicationPageApiResponse {
  metadata: PageMetadata;
  data: StreamerApplicationPageData;
}

export interface StreamerDetailApiResponse {
  metadata: PageMetadata;
  data: Stream;
}