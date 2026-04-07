import { AboutPageApiResponse, LegalPageApiResponse } from "./types";
import { baseFetcher } from "@/lib/api/baseFetcher";

export const getLegalDocument = (
  document: string,
) =>
  baseFetcher<LegalPageApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/legal/${document}`,
  );

export const getAboutPage= () =>
  baseFetcher<AboutPageApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/about`,
  );