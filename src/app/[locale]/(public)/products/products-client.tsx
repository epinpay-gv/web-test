"use client";
import { useEffect, useState, useRef } from "react";
import {
  FilterContainer,
  FilterLabels,
  PageTitle,
  ProductGrid,
} from "@/features/catalog/components";
import { getProducts } from "@/features/catalog/service";
import { useCatalogFilters } from "@/features/catalog/store";
import {
  buildCatalogSearchParams,
  getActiveFilterLabels,
} from "@/features/catalog/utils";
import { PaginationData, Product } from "@/types/types";
import { useRouter } from "next/navigation";
import { Breadcrumb, Pagination, NavTab } from "@/components/common";
import { Home } from "flowbite-react-icons/outline";
import { FilterGroupConfig } from "@/features/catalog/catalog.types";
import { useBasketActions } from "@/features/catalog/hooks/basket/useBasketActions";

interface ProductsClientProps {
  initialProducts: Product[];
  initialFilters: FilterGroupConfig[];
  pagination: PaginationData;
  breadcrumbItems: {
    name: string;
    url: string;
  }[];
}

export default function ProductsClient({
  initialProducts,
  initialFilters,
  pagination,
  breadcrumbItems,
}: ProductsClientProps) {
  const router = useRouter();
  const isFirstRender = useRef(true);

  const pageTitle = breadcrumbItems[2]
    ? `${breadcrumbItems[2]?.name} ürünleri`
    : "Tüm ürünler ";

  const filters = useCatalogFilters((s) => s.filters);
  const setProductType = useCatalogFilters((s) => s.setProductType);
  const resetFilters = useCatalogFilters((s) => s.reset);
  const toggleFilter = useCatalogFilters((s) => s.toggleFilter);
  const setPriceRange = useCatalogFilters((s) => s.setPriceRange);

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [groups, setGroups] = useState(initialFilters);
  const [paginationState, setPaginationState] =
    useState<PaginationData>(pagination);
  const [page, setPage] = useState(1);
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

  const { addToCart, changeQuantity, addToFavorites, notifyWhenAvailable } =
    useBasketActions();

  /**
   * PAGE → FETCH
   */
  useEffect(() => {
    const fetch = async () => {
      if (isLoading) return;
      setIsLoading(true);
      const params = buildCatalogSearchParams(filters);
      params.set("page", String(page));
      params.set("perPage", "16");

      const res = await getProducts(params);

      setProducts(res.data);
      setGroups(res.filters);
      setPaginationState(res.pagination);
    };

    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters]);

  /* FILTER CHANGE → RESET PAGE */
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setPage(1);

    const params = buildCatalogSearchParams(filters);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [filters, router]);

  return (
    <div className="container max-w-7xl mx-auto space-y-4 pb-12">
      <div className="pl-4 md:pl-0 py-4 md:py-6">
        {productTypeTabItems.length > 0 && (
          <NavTab
            items={productTypeTabItems}
            activeValue={filters.productType[0] ?? "all"}
            variant="segmented"
            size="base"
            onChange={(value) => setProductType(value)}
          />
        )}
      </div>
      <div className="px-4 md:px-0">
        <PageTitle
          data={{
            title: `${pageTitle}`,
            totalProductAmount: pagination.count,
          }}
          changeOrder={() => {}}
        />
        <Breadcrumb
          items={breadcrumbItems.map((item, index) => ({
            ...item,
            icon: index === 0 ? <Home size={14} /> : undefined,
          }))}
        />
        <div className="flex md:flex-row flex-col items-start gap-4">
          <FilterContainer
            titleData={{ title: "Filtrele", isUnderlined: true }}
            filters={columnFilters}
            activeFilters={activeFilters}
            resetFilters={resetFilters}
          />

          <div className="flex-1 flex flex-col gap-4 ">
            {activeFilters.length > 0 && (
              <FilterLabels
                activeFilters={activeFilters}
                resetFilters={resetFilters}
                setPriceRange={setPriceRange}
                toggleFilter={toggleFilter}
              />
            )}

            <ProductGrid
              data={products}
              addToCart={addToCart}
              changeQuantity={changeQuantity}
              addToFavorites={addToFavorites}
              notifyWhenAvailable={notifyWhenAvailable}
            />
            <div className="mx-auto">
              <Pagination
                pagination={paginationState}
                onPageChange={(page) => {
                  setPage(page);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
