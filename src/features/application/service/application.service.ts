import { baseFetcher } from "@/lib/api/baseFetcher";
import { ApplicationsApiResponse } from "../types/application.type";


export const getApplications = () =>
  baseFetcher<ApplicationsApiResponse>("/api/user/streamer-application");