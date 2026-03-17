import { baseFetcher } from "@/lib/api/baseFetcher";
import { StreamersApiResponse } from "./streamers.types";

export const getStreamers = () =>
  baseFetcher<StreamersApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/raffles`);

// export const getAllStreamers = () =>
//   baseFetcher<AllRafflesApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/raffles/all-raffles`);
