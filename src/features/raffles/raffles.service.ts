import { baseFetcher } from "@/lib/api/baseFetcher";
import { AllRafflesApiResponse, JoinRaffleApiPayload, RaffleFormData, RafflesApiResponse } from "./raffle.types";
import { Raffle } from "@/types/types";

const RAFFLE_BASE_URL = process.env.NEXT_PUBLIC_API_URL 
  ? `${process.env.NEXT_PUBLIC_API_URL}/raffles` 
  : "/api/raffles";

export const getRaffles = () =>
  baseFetcher<RafflesApiResponse>(RAFFLE_BASE_URL);

export const joinToRaffle = (payload: JoinRaffleApiPayload) =>
  baseFetcher<{ success: boolean }, JoinRaffleApiPayload>(
    RAFFLE_BASE_URL,
    {
      method: "POST",
      body: payload,
    },
    "Sepete eklenemedi",
  );

export const getAllRaffles = () =>
  baseFetcher<AllRafflesApiResponse>(`${RAFFLE_BASE_URL}/all-raffles`);

export const getRaffleById = (id: string) =>
  baseFetcher<Raffle>(`${RAFFLE_BASE_URL}/${id}`);

/**
 * Yeni Çekiliş Oluşturma
 */
export const createRaffleApi = (data: RaffleFormData) =>
  baseFetcher<{ success: boolean; message: string; id: string }, RaffleFormData>(
    RAFFLE_BASE_URL,
    {
      method: "POST",
      body: data,
    },
    "Çekiliş oluşturulurken bir hata oluştu"
  );

/**
 * Çekiliş Güncelleme
 */
export const updateRaffleApi = (id: string, data: RaffleFormData) =>
  baseFetcher<{ success: boolean; message: string }, RaffleFormData>(
    `${RAFFLE_BASE_URL}/${id}`,
    {
      method: "PUT", 
      body: data,
    },
    "Çekiliş güncellenirken bir hata oluştu"
  );