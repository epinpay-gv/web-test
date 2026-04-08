import { baseFetcher } from "@/lib/api/baseFetcher";
import { StreamersApiResponse } from "./streamers.types";
import {  StreamerDetailApiResponse } from "../application/types/application.type";


export const getStreamers = () =>
  baseFetcher<StreamersApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/streamers`);

export const getStreamerDetail = (platform: string, streamer: string) =>
  baseFetcher<StreamerDetailApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/streamers/${platform}/${streamer}`
  );

