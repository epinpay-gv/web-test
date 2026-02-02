'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchSearchResults } from '../fetcher/search.fetcher';
import { SearchItem } from '@/components/layout/Header/types/search.types';

export function useSearch() {
  const [query, setQueryState] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchResults = useCallback(async (searchQuery: string) => {
    // Önceki fetch'i iptal et
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setIsLoading(true);

    try {
      const response = await fetchSearchResults(searchQuery);
      setResults(response.data);
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Search error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      fetchResults(query);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [query, fetchResults]);

  const setQuery = useCallback((value: string) => {
    setQueryState(value);
    if (value.trim()) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, []);

  // Component unmount'ta abort
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    query,
    setQuery,
    results,
    isLoading,
    isOpen,
    setIsOpen,
  };
}