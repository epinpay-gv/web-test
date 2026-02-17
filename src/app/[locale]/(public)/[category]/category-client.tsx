"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import {
  FilterContainer,
  FilterLabels,
  PageTitle,
  ProductGrid,
} from "@/features/catalog/components";
import { getCategory } from "@/features/catalog/service";
import { useCatalogFilters } from "@/features/catalog/store";
import NavTabs from "@/components/common/NavLinks/NavTabs/NavTabs";
import {
  buildCatalogSearchParams,
  getActiveFilterLabels,
} from "@/features/catalog/utils";
import { Category, PaginationData, Product } from "@/types/types";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionItem,
  Breadcrumb,
  ExpandableContent,
  Pagination,
  RatingCard,
} from "@/components/common";
import { Home } from "flowbite-react-icons/outline";
import { FilterGroupConfig } from "@/features/catalog/catalog.types";
import BoxWrapper from "@/components/common/Wrappers/BoxWrapper";
import DOMPurify from "dompurify";

interface CategoryClientProps {
  initialProducts: Product[];
  initialFilters: FilterGroupConfig[];
  pagination: PaginationData;
  breadcrumbItems: {
    name: string;
    url: string;
  }[];
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
  const router = useRouter();
  const isFirstRender = useRef(true);

  const pageTitle = breadcrumbItems[2].name;

  const categoryDescription = useMemo(
    () => DOMPurify.sanitize(initialCategory.translation.description),
    [initialCategory.translation.description],
  );

  const activationDescription = useMemo(
    () => DOMPurify.sanitize(initialCategory.translation.activation ?? ""),
    [initialCategory.translation.activation],
  );

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

      const res = await getCategory(params, categorySlug);

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
    <div className="container max-w-7xl mx-auto pb-12 space-y-4">
      {productTypeTabItems.length > 0 && (
        <NavTabs
          items={productTypeTabItems}
          activeValue={filters.productType[0] ?? "all"}
          variant="segmented"
          size="base"
          onChange={(value) => setProductType(value)}
        />
      )}

      <PageTitle
        data={{
          title: `${pageTitle} ürünleri`,
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
          <ProductGrid data={products} />
          {products.length > 0 && (
            <div className="mx-auto">
              <Pagination
                pagination={paginationState}
                onPageChange={(page) => {
                  setPage(page);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </div>
          )}
          {initialCategory.translation.description && (
            <BoxWrapper title="Ürün Açıklaması">
              <ExpandableContent maxHeight={400}>
                <div
                  dangerouslySetInnerHTML={{ __html: categoryDescription }}
                />
              </ExpandableContent>
            </BoxWrapper>
          )}
          {initialCategory.translation.activation && (
            <BoxWrapper title="Nasıl Aktif Edilir">
              <ExpandableContent maxHeight={400}>
                <div
                  dangerouslySetInnerHTML={{ __html: activationDescription }}
                />
              </ExpandableContent>
            </BoxWrapper>
          )}
          {initialCategory.translation.faq && (
            <BoxWrapper title="Sık Sorulan Sorular">
              {initialCategory.translation.faq.map((item) => (
                <AccordionItem key={item.id} title={item.name}>
                  {item.description}
                </AccordionItem>
              ))}
            </BoxWrapper>
          )}
          {initialCategory.translation.comments && (
            <BoxWrapper title="Değerlendirmeler">
              <ExpandableContent maxHeight={400}>
                <div></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {initialCategory.translation.comments.map((item) => (
                    <RatingCard key={item.id} comment={item} />
                  ))}
                </div>
              </ExpandableContent>
            </BoxWrapper>
          )}
        </div>
      </div>
    </div>
  );
}
