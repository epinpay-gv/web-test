import { baseFetcher } from "@/lib/api/baseFetcher";
import { AllRafflesApiResponse, JoinRaffleApiPayload, RafflesApiResponse } from "./raffle.types";

export const getRaffles = () =>
  baseFetcher<RafflesApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/raffles`);

export const joinToRaffle = (payload: JoinRaffleApiPayload) =>
  baseFetcher<{ success: boolean }, JoinRaffleApiPayload>(
    `${process.env.NEXT_PUBLIC_API_URL}/raffles`,
    {
      method: "POST",
      body: payload,
    },
    "Sepete eklenemedi",
  );

export const getAllRaffles = () =>
  baseFetcher<AllRafflesApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/raffles/all-raffles`);
