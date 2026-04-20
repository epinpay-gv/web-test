export interface SearchItem {
  id: string;
  title: string;
  category: string;
  price: number;
  imgUrl: string; 
  type: 'product' | 'category';
  slug: string;
}

export interface SearchFetcherResponse {
  data: SearchItem[];
  total: number;
}

export interface UseSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: SearchItem[];
  isLoading: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}