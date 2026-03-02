"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FilterContainer,
  FilterLabels,
  PageTitle,
  ProductGrid,
} from "@/features/catalog/components";
import { getActiveFilterLabels } from "@/features/catalog/utils";
import { BreadcrumbItem, PaginationData, Product } from "@/types/types";
import { Breadcrumb, Pagination, NavTab } from "@/components/common";
import { Home } from "flowbite-react-icons/outline";
import {
  FilterGroupConfig,
  CatalogSearchParams,
} from "@/features/catalog/catalog.types";
import { useBasketActions } from "@/features/catalog/hooks/basket/useBasketActions";

interface ProductsClientProps {
  initialProducts: Product[];
  initialFilters: FilterGroupConfig[];
  pagination: PaginationData;
  breadcrumbItems: BreadcrumbItem[];
  currentSearch: CatalogSearchParams;
}

export default function ProductsClient({
  initialProducts,
  initialFilters,
  pagination,
  breadcrumbItems,
  currentSearch,
}: ProductsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // ─── Derived data from props (server already fetched correct data) ────────
  const pageTitle = breadcrumbItems[2]
    ? `${breadcrumbItems[2].name} ürünleri`
    : "Tüm ürünler";

  const tabFilters = initialFilters.find((g) => g.isTab);
  const columnFilters = initialFilters.filter((g) => !g.isTab);

  const productTypeTabItems =
    tabFilters?.elements?.[0]?.type === "checkbox"
      ? tabFilters.elements[0].options.map((opt) => ({
          label: opt.label,
          value: opt.value,
        }))
      : [];

  const activeFilters = getActiveFilterLabels(currentSearch, initialFilters);

  const { addToCart, changeQuantity, addToFavorites, notifyWhenAvailable } =
    useBasketActions();

  // ─── URL mutation helpers ─────────────────────────────────────────────────

  function navigate(updater: (p: URLSearchParams) => void) {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      updater(params);
      router.replace(`?${params.toString()}`, { scroll: false });
    });
  }

  function handleProductTypeChange(value: string) {
    navigate((p) => {
      if (value === "all") {
        p.delete("type");
      } else {
        p.set("type", value);
      }
      p.delete("page"); 
    });
  }

  function handleToggleFilter(key: keyof CatalogSearchParams, value: string) {
    console.log("KEY : ", key, " VALUE : ", value);
    navigate((p) => {
      const existing = p.getAll(key);
      p.delete(key);
      const next = existing.includes(value)
        ? existing.filter((v) => v !== value)
        : [...existing, value];
      next.forEach((v) => p.append(key, v));
      p.delete("page");
    });
  }

  function handleSetPriceRange(min?: number, max?: number) {
    navigate((p) => {
      if (min !== undefined) p.set("minPrice", String(min));
      else p.delete("minPrice");

      if (max !== undefined) p.set("maxPrice", String(max));
      else p.delete("maxPrice");

      p.delete("page");
    });
  }

  function handleToggleBoolean(key: "inTr" | "inStock") {
    navigate((p) => {
      if (key === "inTr") p.set("inTr", "true");
      if (key === "inStock") p.set("inStock", "true");
    });
  }

  function handleResetFilters() {
    navigate((p) => {
      (
        [
          "category",
          "region",
          "platform",
          "type",
          "genre",
          "sort",
          "minPrice",
          "maxPrice",
          "inTr",
          "inStock",
          "page",
        ] as const
      ).forEach((k) => p.delete(k));
    });
  }

  function handlePageChange(page: number) {
    navigate((p) => {
      p.set("page", String(page));
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="container max-w-7xl mx-auto space-y-4 pb-12">
      <div className="pl-4 md:pl-0 py-4 md:py-6 w-full">
        {productTypeTabItems.length > 0 && (
          <NavTab
            items={productTypeTabItems}
            activeValue={currentSearch.type ?? "all"}
            variant="segmented"
            size="base"
            onChange={handleProductTypeChange}
          />
        )}
      </div>

      <div className="px-4 md:px-0">
        <PageTitle
          data={{
            title: pageTitle,
            totalProductAmount: pagination.count,
          }}
          isLoading={isPending}
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
            resetFilters={handleResetFilters}
            currentSearch={currentSearch}
            toggleFilter={handleToggleFilter}
            setPriceRange={handleSetPriceRange}
            toggleBoolean={handleToggleBoolean}
          />

          <div className="flex-1 flex flex-col gap-4">
            {activeFilters.length > 0 && (
              <FilterLabels
                activeFilters={activeFilters}
                resetFilters={handleResetFilters}
                setPriceRange={handleSetPriceRange}
                toggleFilter={handleToggleFilter}
              />
            )}

            <ProductGrid
              data={initialProducts}
              addToCart={addToCart}
              changeQuantity={changeQuantity}
              addToFavorites={addToFavorites}
              notifyWhenAvailable={notifyWhenAvailable}
            />

            <div className="mx-auto">
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
