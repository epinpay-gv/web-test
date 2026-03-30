"use client";
import { PaginationData } from "@/types/types";
import { Pagination } from "@/components/common";
import { FilterGroupConfig } from "@/features/filters/filters.types";
import { useUrlFilters } from "@/features/filters/hooks/useUrlFilters";

interface PaginationContainerProps {
  initialFilters: FilterGroupConfig[];
  pagination: PaginationData;
}

export default function PaginationContainer({
  initialFilters,
  pagination,
}: PaginationContainerProps) {
  const { handlePageChange } = useUrlFilters(initialFilters);
  return (
    <div className="mx-auto">
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}
