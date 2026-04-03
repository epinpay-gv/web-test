import { baseFetcher } from "@/lib/api/baseFetcher";
import { BlogApiResponse, ArticleApiResponse } from "./blog.types";

export const getBlog = ( search: URLSearchParams) =>
  baseFetcher<BlogApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/blog?${search.toString()}`,
  );

export const getArticle = (article: string) =>
  baseFetcher<ArticleApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/${article}`,
  );
