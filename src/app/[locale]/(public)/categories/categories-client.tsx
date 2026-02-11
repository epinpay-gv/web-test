"use client";
import { useEffect, useState } from "react";
import { Category, PaginationData } from "@/types/types";
import { getCategories } from "@/features/catalog/service";
import { CategoryGrid, PageTitle } from "@/features/catalog/components";
import { Pagination } from "@/components/common";

export default function CategoriessClient({
  data,
  pagination,
}: {
  data: Category[];
  pagination: PaginationData;
}) {

  const [paginationState, setPaginationState] =
    useState<PaginationData>(pagination);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * PAGE → FETCH
   */
  useEffect(() => {
    const fetch = async () => {
      if (isLoading) return;
      setIsLoading(true);

      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("perPage", "15");

      const res = await getCategories(params);

      setPaginationState(res.pagination);
    };

    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="container max-w-7xl mx-auto pb-12 ">
      <PageTitle
        data={{
          title: "Kategoriler ",
          totalProductAmount: pagination.count,
        }}
      />
      <div className="flex flex-col items-center gap-4">
        <CategoryGrid data={data} pagination={pagination} />
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
