import { baseFetcher } from "@/lib/api/baseFetcher";
import { StreamerDetailApiResponse, StreamersApiResponse } from "./streamers.types";

export const getStreamers = () =>
  baseFetcher<StreamersApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/streamers`);

export const getStreamerDetail = (platform: string, streamer: string) =>
  baseFetcher<StreamerDetailApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/streamers/${platform}/${streamer}`
  );
