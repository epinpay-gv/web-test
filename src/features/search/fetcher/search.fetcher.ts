import { MOCK_SEARCH_DATA } from './mock-data';
import { SearchFetcherResponse } from '@/components/layout/Header/types/search.types';

// API'ye benzer async delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchSearchResults(
  query: string
): Promise<SearchFetcherResponse> {
  // Gerçek API çağrısı gibi delay simüle et
  await delay(400);

  if (!query.trim()) {
    return { data: [], total: 0 };
  }

  const filtered = MOCK_SEARCH_DATA.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return {
    data: filtered,
    total: filtered.length,
  };
}