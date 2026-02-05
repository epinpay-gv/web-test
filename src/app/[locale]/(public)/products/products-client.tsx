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

  return (
    <div className="container max-w-7xl mx-auto pb-12">
      <PageTitle
        data={{
          title: "Tüm ürünler",
          totalProductAmount: total,
        }}
        changeOrder={() => {}}
      />

      <div className="flex gap-4">
        <FilterContainer titleData={{ title: "Filtrele", isUnderlined: true }} groups={groups} />
        <ProductGrid data={products} />
      </div>
    </div>
  );
}
