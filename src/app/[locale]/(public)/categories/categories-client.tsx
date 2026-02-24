"use client";
import { useEffect, useState } from "react";
import { Category, PaginationData } from "@/types/types";
import { getCategories } from "@/features/catalog/service";
import { CategoryGrid, PageTitle } from "@/features/catalog/components";
import { Breadcrumb, Pagination } from "@/components/common";
import { Home } from "flowbite-react-icons/outline";

interface ProductsClientProps {
  data: Category[];
  pagination: PaginationData;
  breadcrumbItems: {
    name: string;
    url: string;
  }[];
}

export default function CategoriessClient({
  data,
  pagination,
  breadcrumbItems,
}: ProductsClientProps) {
  const [categories, setCategories] = useState<Category[]>(data);
  const [paginationState, setPaginationState] =
    useState<PaginationData>(pagination);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * PAGE → FETCH
   */
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("perPage", "15");

        const res = await getCategories(params);

        setCategories(res.data);
        setPaginationState(res.pagination);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return (
    <div className="container max-w-7xl mx-auto pb-12 px-4 md:px-0">
      <div className="pl-4 md:pl-0 py-4 md:py-6 w-full"></div>
      <PageTitle
        data={{
          title: "Kategoriler ",
          totalProductAmount: paginationState.count,
        }}
        onSelect={function (id: string): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Breadcrumb
        items={breadcrumbItems.map((item, index) => ({
          ...item,
          icon: index === 0 ? <Home size={14} /> : undefined,
        }))}
      />
      <div className="flex flex-col items-center gap-4">
        <CategoryGrid data={categories} pagination={pagination} />
        <Pagination
          pagination={paginationState}
          onPageChange={(page) => {
            setPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </div>
    </div>
  );
}
