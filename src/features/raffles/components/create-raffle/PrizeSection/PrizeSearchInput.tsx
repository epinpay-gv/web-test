'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { Search } from 'flowbite-react-icons/outline';
import { Input } from '@/components/common';
import { Product } from '@/types/types';
import { searchProductsApi } from '../../../raffles.service';
import Image from 'next/image';

interface PrizeSearchInputProps {
  onSelect: (product: Product) => void;
  placeholder?: string;
  selectedValue?: string;
  editMode?: boolean
  excludedIds?: string[]; 
}

export function PrizeSearchInput({ 
  onSelect, 
  placeholder, 
  selectedValue, 
  editMode,
  excludedIds = [] 
}: PrizeSearchInputProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(selectedValue || "");
  }, [selectedValue]);

  useEffect(() => {
    const fetchProducts = async () => {      
      if (!query.trim() || query === selectedValue) {
        setResults([]);
        return;
      }
      
      setIsLoading(true);
      try {
        const response = await searchProductsApi(query);
        setResults(response.data || []);
        setIsOpen(true);
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(fetchProducts, 300);
    return () => clearTimeout(debounce);
  }, [query, selectedValue]);
  
  const filteredResults = useMemo(() => {
    if (excludedIds.length === 0) return results;
    return results.filter((item) => !excludedIds.includes(String(item.id)));
  }, [results, excludedIds]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <Input
        variant="default"
        leftIcon={<Search className="w-5 h-5 text-(--text-body-subtle)" />}
        placeholder={placeholder}
        value={query}
        rightIcon={<></>}
        disabled={editMode}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
      />

      {isOpen && query.trim() !== "" && (
        <div className="absolute top-full mt-2 w-full rounded-xl border border-gray-800 bg-[#0d121a] shadow-2xl z-[999] overflow-hidden animate-in fade-in slide-in-from-top-1">
          {isLoading ? (
            <div className="p-6 flex justify-center">
              <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredResults.length > 0 ? (
            <ul className="max-h-60 overflow-y-auto">
              {filteredResults.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 cursor-pointer border-b border-gray-800/50 last:border-b-0 group"
                  onClick={() => {
                    onSelect(item);
                    setIsOpen(false);
                  }}
                >
                  <Image 
                    src={item.translation.imgUrl || ""} 
                    width={35}
                    height={35}
                    className="w-8 h-8 rounded object-cover bg-gray-900" 
                    alt={item.translation.name || "product"} 
                  />
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-sm text-white truncate font-medium group-hover:text-cyan-400 transition-colors">
                      {item.translation.name}
                    </span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-tighter">
                      {item.platform} • {item.region}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-cyan-400">
                    {(item.cheapestOffer?.amount ?? item.basePrice ?? 0).toLocaleString('tr-TR')}₺
                  </span>
                </li>
              ))}
            </ul>
          ) : (                    
            <div className="p-8 flex flex-col items-center justify-center text-center">
              <div className="text-gray-600 mb-2">
                <Search className="w-8 h-8 opacity-20" />
              </div>
              <p className="text-sm text-gray-400 font-medium">
                {results.length > 0 && filteredResults.length === 0 
                  ? "Bu ürün zaten eklendi" 
                  : "Aradığınız ürün bulunamadı"}
              </p>
              <p className="text-[10px] text-gray-600 mt-1">
                {results.length > 0 && filteredResults.length === 0
                  ? "Lütfen listede olmayan bir ürün seçin."
                  : "Lütfen farklı bir kelime deneyin veya satışta olan bir ürün arayın."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}