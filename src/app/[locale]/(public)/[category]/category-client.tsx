"use client";
import {
  FilterContainer,
  FilterLabels,
  PageTitle,
  ProductGrid,
  SeoSection,
} from "@/features/catalog/components";
import { getActiveFilterLabels } from "@/features/catalog/utils";
import {
  BreadcrumbItem,
  Category,
  PaginationData,
  Product,
} from "@/types/types";
import { Breadcrumb, NavTab, Pagination } from "@/components/common";
import { Home } from "flowbite-react-icons/outline";
import { FilterGroupConfig } from "@/features/catalog/catalog.types";
import { useBasketActions } from "@/features/catalog/hooks/basket/useBasketActions";
import { useCatalogUrlFilters } from "@/features/catalog/hooks";

interface CategoryClientProps {
  initialProducts: Product[];
  initialFilters: FilterGroupConfig[];
  pagination: PaginationData;
  breadcrumbItems: BreadcrumbItem[];
  initialCategory: Category;
  categorySlug: string;
}

export default function CategoryClient({
  initialProducts,
  initialFilters,
  pagination,
  breadcrumbItems,
  categorySlug,
  initialCategory,
}: CategoryClientProps) {
  const {
    searchParams,
    isPending,
    handleProductTypeChange,
    handleToggleFilter,
    handleSetPriceRange,
    handleToggleBoolean,
    handleResetFilters,
    handlePageChange,
    handleSortChange,
  } = useCatalogUrlFilters(initialFilters);

  const { addToCart, changeQuantity, addToFavorites, notifyWhenAvailable } =
    useBasketActions();

  const pageTitle = breadcrumbItems[2]
    ? `${breadcrumbItems[2].name} ürünleri`
    : "Tüm ürünler";

  const tabFilters = initialFilters.find((g) => g.isTab);
  const titleFilters = initialFilters.find((g) => g.isTitle);
  const columnFilters = initialFilters.filter((g) => !g.isTab && !g.isTitle);

  const productTypeTabItems =
    tabFilters?.elements?.[0]?.type === "checkbox"
      ? tabFilters.elements[0].options.map((opt) => ({
          label: opt.label,
          value: opt.value,
        }))
      : [];

  const activeFilters = getActiveFilterLabels(
    new URLSearchParams(searchParams.toString()),
    initialFilters,
  );

  const sortDropdownEl = titleFilters?.elements.find(
    (el) => el.type === "dropdown",
  );
  const defaultSort =
    sortDropdownEl?.type === "dropdown"
      ? (sortDropdownEl.options[0]?.value ?? "")
      : "";
  const currentSort = searchParams.get("sort") ?? defaultSort;
  const activeType = searchParams.get("type") ?? "all";

  return (
    <div className="container max-w-7xl mx-auto space-y-4 pb-12">
      <div className="pl-4 md:pl-0 py-4 md:py-6">
        {productTypeTabItems.length > 0 && (
          <NavTab
            items={productTypeTabItems}
            activeValue={activeType}
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
          titleFilter={titleFilters}
          currentSort={currentSort}
          onSortSelect={handleSortChange}
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
            toggleFilter={handleToggleFilter}
            setPriceRange={handleSetPriceRange}
            toggleBoolean={handleToggleBoolean}
            titleFilter={titleFilters}
            currentSort={currentSort}
            onSortSelect={handleSortChange}
          />

          <div className="flex-1 flex flex-col gap-4 ">
            {activeFilters.length > 0 && (
              <FilterLabels
                activeFilters={activeFilters}
                resetFilters={handleResetFilters}
                setPriceRange={handleSetPriceRange}
                toggleFilter={handleToggleFilter}
                isLoading={isPending}
              />
            )}
            <ProductGrid
              data={initialProducts}
              addToCart={addToCart}
              changeQuantity={changeQuantity}
              addToFavorites={addToFavorites}
              notifyWhenAvailable={notifyWhenAvailable}
              isLoading={isPending}
            />
            {initialProducts.length > 0 && (
              <div className="mx-auto">
                <Pagination
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
            <SeoSection initialCategory={initialCategory} />
          </div>
        </div>
      </div>
    </div>
  );
}
