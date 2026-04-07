import { baseFetcher } from "@/lib/api/baseFetcher";
import {
  StreamersApiResponse,
  StreamerApplicationPageApiResponse,
  StreamerApplicationPayload,
  StreamerApplicationResponse,
  StreamerDetailApiResponse
} from "./streamers.types";

export const getStreamers = () =>
  baseFetcher<StreamersApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/streamers`);

export const getStreamerDetail = (platform: string, streamer: string) =>
  baseFetcher<StreamerDetailApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/streamers/${platform}/${streamer}`
  );

export const getStreamerApplicationData = () =>
  baseFetcher<StreamerApplicationPageApiResponse>("/api/streamers/application");

export const submitStreamerApplication = (payload: StreamerApplicationPayload) =>
  baseFetcher<StreamerApplicationResponse, StreamerApplicationPayload>("/api/streamers/application", {
    method: "POST",
    body: payload,
  }, "Başvuru işlemi sırasında bir hata oluştu.");
