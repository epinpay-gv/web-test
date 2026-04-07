import { FAQ, PageMetadata } from "@/types/types";

enum StreamerStatus {
  active,
  under_review,
  suspended,
  banned,
}

enum StreamerPlatform {
  TWITCH = "twitch",
  KICK = "kick",
  YOUTUBE = "youtube",
}

export interface StreamerChannels {
  id: string;
  streamer_id: string;
  platform: StreamerPlatform;
  platform_channel_id: string;
  channel_url: string;
  is_primary: boolean;
  created_at: string;
}

export interface StreamerDonations {
  id: string;
  streamer_id: string;
  donor_user_id: string;
  display_name: string;
  amount: number;
  currency_code: string;
  message: string;
  wallet_payment_ref: string;
  created_at: string;
}

export interface SocialLink {
  platform: "x" | "youtube" | "instagram" | "discord";
  url: string;
}

export interface Streamers {
  id: string;
  user_id: string;
  application_id: string;
  full_name: string;
  nick_name: string;
  email: string;
  phone: string;
  avatar_url: string;
  geo_country: string[];
  stream_urls: string[];
  social_links: string;
  streamer_status: StreamerStatus;
  can_receive_donation: boolean;
  created_at: string;
  updated_at: string;
  channels: StreamerChannels[];
  donations: StreamerDonations[];
}

export interface Packages {
  id: string;
  name: string;
  order_rank: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;

  description: string[]; //! backende eklenecek
  rewardMin: string; //! backende eklenecek
  rewardMax: string; //! backende eklenecek
  rewardCurrenct: string; //! backende eklenecek
  detail_criteria: BasicPackageCriteria[]; //! backende eklenecek
}

export interface PackageDetails {
  id: string;
  package_id: string;
  version: number;
  is_current: boolean;
  eligible_countries: string;
  advantages: string;
  evaluation_period_days: number;
  is_starter: boolean;
  created_by: string;
  updated_by: string;
  detail_criteria: PackageCriteria[];
}

export interface PackageCriteria {
  id: string;
  name: string;
  unit: string;
  is_active: boolean;
  created_by: string;
  updated_by: string;
}

// ! alttaki tipler backendde yok, front için gerekli sadeleştirilmiş halleri
export interface Stream {
  streamer: BasicStreamer;
  streamURl: string;
  platform_value: string;
}

export interface BasicStreamer {
  streamerId: string;
  full_name: string;
  nick_name: string;
  avatar_url: string;
  package: StreamerLeague;
  followerCount: number;
  isLive: boolean;
  isEpinpayStreamer: boolean;
  socialLinks?: SocialLink[];
}

export interface BasicPackageCriteria {
  id: string;
  name: string;
  value: string;
}
export interface StreamPlatform {
  icon: string;
  platform_value: string; //tiktok
  platform_label: string; //TikTok
}

// ! backendden böyle dönmeli (imajlarla eşleşmesi için böyle bir veri gerekiyor ileride)
export type StreamerLeague =
  | "rookie"
  | "bronze"
  | "silver"
  | "gold"
  | "platinum";

/* RESPONSE & PAYLOAD TYPES */

export interface StreamersApiResponse {
  metadata: PageMetadata;
  data: {
    mainBanner: Stream[];
  streams: { platforms: StreamPlatform[]; streams: Stream[] };
    epinpayStreamer: BasicStreamer[];
    packages: Packages[];
    faq: FAQ[];
  };
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


