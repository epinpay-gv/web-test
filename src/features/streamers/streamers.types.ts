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
  
  details: PackageDetails[];

  description: string; //! backende eklenecek
}

// 5. package_details — Versiyonlanmış paket iş kuralları
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
}

// 6. package_criteria — Admin tarafından tanımlanan kriter havuzu
export interface PackageCriteria {
  id: string;
  name: string;
  unit: string;
  is_active: boolean;
  created_by: string;
  updated_by: string;
}

export interface Stream {
  streamerId: string;
  full_name: string;
  nick_name: string;
  avatar_url: string;
  isEpinpayStreamer: boolean;
  streamURl: string;
}

/* RESPONSE & PAYLOAD TYPES */

export interface StreamersApiResponse {
  metadata: PageMetadata;
  data: {
    mainBanner: Stream[];
    streams: Stream[];
    epinpayStreamer: Streamers[];
    packages: Packages[];
    faq: FAQ[];
  };
}
