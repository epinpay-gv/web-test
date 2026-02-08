"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  FilterContainer,
  PageTitle,
  ProductGrid,
} from "@/features/catalog/components";
import { FilterGroupConfig } from "@/features/catalog/components/filters/Filters/types";
import { getProducts } from "@/features/catalog/service";
import { useCatalogFilters } from "@/features/catalog/store";
import NavTabs from "@/components/common/NavLinks/NavTabs/NavTabs";
import {
  buildCatalogSearchParams,
  getActiveFilterLabels,
} from "@/features/catalog/utils";
import { Product } from "@/types/types";
import { useRouter } from "next/navigation";

export default function ProductsClient({
  initialProducts,
  initialFilters,
  total,
}: {
  initialProducts: Product[];
  initialFilters: FilterGroupConfig[];
  total: number;
}) {
  const router = useRouter();
  const observerRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useRef(true);

  const filters = useCatalogFilters((s) => s.filters);
  const setProductType = useCatalogFilters((s) => s.setProductType);
  const resetFilters = useCatalogFilters((s) => s.reset);
  const toggleFilter = useCatalogFilters((s) => s.toggleFilter);
  const setPriceRange = useCatalogFilters((s) => s.setPriceRange);

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [groups, setGroups] = useState(initialFilters);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const tabFilters = groups.find((item) => item.isTab);
  const columnFilters = groups.filter((item) => !item.isTab);

  const productTypeTabItems =
    tabFilters?.elements?.[0]?.type === "checkbox"
      ? tabFilters.elements[0].options.map((opt) => ({
          label: opt.label,
          value: opt.value,
        }))
      : [];

  const activeFilters = getActiveFilterLabels(filters, groups);

  /**
   * PAGE → FETCH
   */
  useEffect(() => {
    const fetch = async () => {
      if (isLoading) return;

      setIsLoading(true);

      const params = buildCatalogSearchParams(filters);
      params.set("page", String(page));
      params.set("perPage", "8");

      const res = await getProducts(params);

      setGroups(res.filters);
      setHasMore(res.pagination.has_more ?? false);

      setProducts((prev) => (page === 1 ? res.data : [...prev, ...res.data]));

      setIsLoading(false);
    };

    fetch();
  }, [page, filters]);

  /**
   * FILTER CHANGE → RESET PAGE
   */
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const params = buildCatalogSearchParams(filters);
    router.replace(`?${params.toString()}`, { scroll: false });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [filters, router]);

  /**
   * INFINITE SCROLL
   */
  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          setPage((p) => p + 1);
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  return (
    <div className="container max-w-7xl mx-auto py-12 space-y-4">
      {productTypeTabItems.length > 0 && (
        <NavTabs
          items={productTypeTabItems}
          activeValue={filters.productType[0]}
          variant="segmented"
          size="base"
          onChange={(value) => setProductType(value)}
        />
      )}

      <PageTitle
        data={{
          title: "Tüm ürünler",
          totalProductAmount: total,
        }}
        changeOrder={() => {}}
      />

      <div className="flex md:flex-row flex-col gap-4">

        <FilterContainer
          titleData={{ title: "Filtrele", isUnderlined: true }}
          filters={columnFilters}
          activeFilters={activeFilters}
          resetFilters={resetFilters}
        />

        <div className="flex-1">
          {/* // TODO : Burası label ile değiştirilecek */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <button
                onClick={resetFilters}
                className="text-(--text-fg-brand) mr-2 cursor-pointer hover:underline"
              >
                Seçimleri Temizle
              </button>

              {activeFilters.map((chip) => (
                <button
                  key={`${chip.key}-${chip.value}`}
                  className=" group transition-all cursor-pointer flex items-center gap-1 rounded-sm border border-(--border-default) px-2 py-1 text-sm hover:bg-(--bg-danger-soft)"
                  onClick={() => {
                    if (chip.key === "price") {
                      setPriceRange(undefined, undefined);
                    } else {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      toggleFilter(chip.key as any, chip.value);
                    }
                  }}
                >
                  {chip.label}
                  <span
                    className="ml-0 overflow-hidden whitespace-nowrap opacity-0 w-0 transition-all duration-200 group-hover:opacity-100 group-hover:w-3 group-hover:ml-1 text-xs"
                  >
                    ✕
                  </span>
                </button>
              ))}
            </div>
          )}

          <ProductGrid data={products} />
          {hasMore && (
            <div
              ref={observerRef}
              className="h-10 flex items-center justify-center text-sm"
            >
              {isLoading && "Yükleniyor..."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
