import { SearchFetcherResponse } from '@/components/layout/Header/types/search.types';
import { baseFetcher } from '@/lib/api/baseFetcher';

export async function fetchSearchResults(query: string): Promise<SearchFetcherResponse> {
  return baseFetcher<SearchFetcherResponse>(
    `/search?q=${encodeURIComponent(query)}&limit=10`,
  );
}