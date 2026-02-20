import { baseFetcher } from "@/lib/api/baseFetcher";
import { MainPageApiResponse } from "./mainpage.types";

export const getMainPageData = () => {
  return baseFetcher<MainPageApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/mainpage`
  );
};
