"use client";

import { useEffect, useState } from "react";
import {
  FilterContainer,
  PageTitle,
  ProductGrid,
} from "@/features/catalog/components/components";
import { getProducts } from "@/features/catalog/service";
import { FilterGroupConfig } from "@/features/catalog/components/filters/Filters/types";
import { useCatalogFilters } from "@/features/catalog/store/catalogFilters.store";
import { ProductPageData } from "@/features/catalog/types";
import NavTabs from "@/components/common/NavLinks/NavTabs/NavTabs";

export default function ProductsClient({
  initialProducts,
  initialFilters,
  total,
}: {
  initialProducts: ProductPageData[];
  initialFilters: FilterGroupConfig[];
  total: number;
}) {
  const filters = useCatalogFilters();
  const [products, setProducts] = useState(initialProducts);
  const [groups, setGroups] = useState(initialFilters);

  useEffect(() => {
    const params = new URLSearchParams();

    filters.category?.forEach((v) => params.append("category", v));
    filters.region?.forEach((v) => params.append("region", v));
    filters.platform?.forEach((v) => params.append("platform", v));

    if (filters.minPrice) params.set("minPrice", String(filters.minPrice));
    if (filters.maxPrice) params.set("maxPrice", String(filters.maxPrice));

    getProducts(params).then((res) => {
      setProducts(res.data);
      setGroups(res.filters);
    });
  }, [
    filters.category?.join(","),
    filters.region?.join(","),
    filters.platform?.join(","),
    filters.minPrice,
    filters.maxPrice,
  ]);

  const productTypeGroup = groups.find(
    (item) => item.titleData?.title === "Ürün Tipi",
  );

  // const productTypeTabItems =
  //   productTypeGroup?.elements?.[0]?.options?.map((opt) => ({
  //     label: opt.label,
  //     value: opt.value,
  //   })) ?? [];

  return (
    <div className="container max-w-7xl mx-auto pb-12">
      {/* {productTypeTabItems.length > 0 && (
        <NavTabs
          items={productTypeTabItems}
          activeValue={activeProductType}
          onChange={(val) => {
            // setActiveProductType(val);
            // filters.setProductType?.([val]);
          }}
          variant="segmented"
          size="base"
        />
      )} */}

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
          filters={groups}
        />
        <ProductGrid data={products} />
      </div>
    </div>
  );
}
