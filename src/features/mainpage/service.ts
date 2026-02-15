import { baseFetcher } from "@/lib/api/baseFetcher";
import { Bestsellers, PremiumPlan, Promoted } from "./mainpage.types";

// RESPONSE TYPES
export interface MainPageApiResponse {
  promoted: Promoted;
  bestsellers: Bestsellers;
  premium: PremiumPlan[];
}


// REQUESTS
export const getMainPageData = () => {
  return baseFetcher<MainPageApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/mainpage`
  );
};
