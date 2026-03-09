import { baseFetcher } from "@/lib/api/baseFetcher";
import { RafflesApiResponse } from "./raffle.types";

export const getRaffles = () =>
  baseFetcher<RafflesApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/raffles`);
