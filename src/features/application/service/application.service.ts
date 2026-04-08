
import { baseFetcher } from "@/lib/api/baseFetcher";
import {
  StreamerApplicationPageApiResponse,
  StreamerApplicationPayload,
  StreamerApplicationResponse,
  ApplicationsApiResponse,
} from "../types/application.type";

export const getStreamerApplicationData = () =>
  baseFetcher<StreamerApplicationPageApiResponse>("/api/application");

export const submitStreamerApplication = (payload: StreamerApplicationPayload) =>
  baseFetcher<StreamerApplicationResponse, StreamerApplicationPayload>(
    "/api/application",
    { method: "POST", body: payload },
    "Başvuru işlemi sırasında bir hata oluştu."
  );

export const getApplications = () =>
  baseFetcher<ApplicationsApiResponse>("/api/user/streamer-application");