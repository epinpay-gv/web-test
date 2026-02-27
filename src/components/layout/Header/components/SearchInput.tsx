'use client';

import { useRef, useEffect } from 'react';
import { useSearch } from '@/features/search/fetcher/services';
import { Search } from 'flowbite-react-icons/outline';
import { Input } from '@/components/common';
import { useTranslations } from 'next-intl';

export function SearchInput() {
  const t = useTranslations("layout.header");

  const { query, setQuery, results, isLoading, isOpen, setIsOpen } = useSearch();
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen]);
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [setIsOpen]);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <Input
        variant="default"
        leftIcon={<Search className='w-5 h-5' />}
        placeholder="Search"
        value={query}
        onClear={() => setQuery("")}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {
          if (query.trim()) setIsOpen(true);
        }}
      />

      {/* Dropdown Liste */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full rounded-(--radius-base) border border-gray-700 bg-gray-800 shadow-xl z-50 overflow-hidden">
          
          {/* Loading State */}
          {isLoading && (
            <div className="px-4 py-8 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-gray-600 border-t-blue-500 rounded-full animate-spin" />
            </div>
          )}

          {/* Sonuçlar */}
          {!isLoading && results.length > 0 && (
            <>
              <div className="px-4 py-2 border-b border-gray-700">
                <span className="text-xs text-gray-500">
                  {results.length} {t("searchFound")}
                </span>
              </div>
              <ul className="max-h-72 overflow-y-auto">
                {results.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 cursor-pointer transition-colors border-b border-gray-700 last:border-b-0"
                    onClick={() => {
                      setQuery(item.title);
                      setIsOpen(false);
                    }}
                  >
                    {/* Image Placeholder */}
                    <div className="w-10 h-10 rounded-(--radius-base) bg-gray-700 shrink-0 flex items-center justify-center">
                      <Search />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-sm text-white truncate">
                        {item.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        {item.category}
                      </span>
                    </div>

                    {/* Price */}
                    <span className="text-sm font-semibold text-blue-400 shrink-0">
                      {item.price.toLocaleString('tr-TR')}₺
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Empty State */}
          {!isLoading && results.length === 0 && query.trim() && (
            <div className="px-4 py-8 flex flex-col items-center justify-center gap-2">
              <Search />
              <p className="text-sm text-gray-500">
                {query} {t("searchNotFound")}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}