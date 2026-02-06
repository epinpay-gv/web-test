"use client";
import { useEffect, useState, useRef } from "react";
import {
  FilterContainer,
  PageTitle,
  ProductGrid,
} from "@/features/catalog/components/components";
import { getProducts } from "@/features/catalog/service";
import { FilterGroupConfig } from "@/features/catalog/components/filters/Filters/types";
import { useCatalogFilters } from "@/features/catalog/store/catalogFilters.store";
import NavTabs from "@/components/common/NavLinks/NavTabs/NavTabs";
import { buildCatalogSearchParams } from "@/features/catalog/utils/buildCatalogSearchParams";
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
  const isFirstRender = useRef(true);

  const filters = useCatalogFilters((s) => s.filters);
  const setProductType = useCatalogFilters((s) => s.setProductType);

  const [products, setProducts] = useState(initialProducts);
  const [groups, setGroups] = useState(initialFilters);

  const tabFilters = groups.find((item) => item.isTab);

  const columnFilters = groups.filter((item) => !item.isTab);

  const productTypeTabItems =
    tabFilters?.elements?.[0]?.options?.map((opt) => ({
      label: opt.label,
      value: opt.value,
    })) ?? [];

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    console.log("FILTERS : ", filters);
    const params = buildCatalogSearchParams(filters);

    router.replace(`?${params.toString()}`, {
      scroll: false,
    });

    getProducts(params).then((res) => {
      setProducts(res.data);
      setGroups(res.filters);
    });
  }, [filters]);

  return (
    <div className="container max-w-7xl mx-auto py-12 space-y-4">
      {productTypeTabItems.length > 0 && (
        <div className="w-full">
          <NavTabs
            items={productTypeTabItems}
            activeValue={filters.productType[0]}
            variant="segmented"
            size="base"
            onChange={(value) => setProductType(value)}
          />
        </div>
      )}

      <PageTitle
        data={{
          title: "Tüm ürünler",
          totalProductAmount: total,
        }}
        changeOrder={() => {}}
      />

      <div className="flex gap-4">
        <FilterContainer
          titleData={{ title: "Filtrele", isUnderlined: true }}
          filters={columnFilters}
        />
        <ProductGrid data={products} />
      </div>
    </div>
  );
}
