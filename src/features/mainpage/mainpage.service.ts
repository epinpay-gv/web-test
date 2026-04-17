import { baseFetcher } from "@/lib/api/baseFetcher";
import { MainPageApiResponse } from "./mainpage.types";

export const getMainPageData = () => {
  return baseFetcher<MainPageApiResponse>(
    `/mainpage`
  );
};
