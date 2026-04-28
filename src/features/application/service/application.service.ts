
import { baseFetcher } from "@/lib/api/baseFetcher";
import {
  StreamerApplicationPageApiResponse,
  StreamerApplicationPayload,
  StreamerApplicationResponse,
  ApplicationsApiResponse,
} from "../types/application.type";

export const getStreamerApplicationData = () =>
  baseFetcher<StreamerApplicationPageApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/application`
  );

export const submitStreamerApplication = (payload: StreamerApplicationPayload) =>
  baseFetcher<StreamerApplicationResponse, StreamerApplicationPayload>(
    `${process.env.NEXT_PUBLIC_API_URL}/application`,
    { method: "POST", body: payload },
    "Başvuru işlemi sırasında bir hata oluştu."
  );

export const getApplications = () =>
  baseFetcher<ApplicationsApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/user/streamer-application`
  );