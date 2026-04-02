import { baseFetcher } from "@/lib/api/baseFetcher";
import {
  StreamersApiResponse,
  StreamerApplicationPageApiResponse,
  StreamerApplicationPayload,
  StreamerApplicationResponse
} from "./streamers.types";

export const getStreamers = () =>
  baseFetcher<StreamersApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/streamers`);

// export const getAllStreamers = () =>
//   baseFetcher<AllRafflesApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/raffles/all-raffles`);

export const getStreamerApplicationData = () =>
  baseFetcher<StreamerApplicationPageApiResponse>("/api/streamers/application");

export const submitStreamerApplication = (payload: StreamerApplicationPayload) =>
  baseFetcher<StreamerApplicationResponse, StreamerApplicationPayload>("/api/streamers/application", {
    method: "POST",
    body: payload,
  }, "Başvuru işlemi sırasında bir hata oluştu.");
