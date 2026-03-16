"use client";
import { Pagination, Button } from "@/components/common";
import StatusState from "@/components/common/StatusState/StatusState";
import { FilterGroupConfig } from "@/features/filters/filters.types";
import { useUrlFilters } from "@/features/filters/hooks/useUrlFilters";
import { FiltersSection, OrdersSection } from "@/features/user/components";
import { Order } from "@/features/user/user.types";
import { PaginationData } from "@/types/types";
import { useRouter } from "next/navigation";

interface OrdersClientProps {
  data: Order[];
  pagination: PaginationData;
  initialFilters: FilterGroupConfig[];
}

export default function OrdersClient({
  data,
  pagination,
  initialFilters,
}: OrdersClientProps) {
  const router = useRouter();
  const {
    searchParams,
    handleSearchChange,
    handleSingleFilter,
    handleDateRangeChange,
    handlePageChange,
    handleResetFilters,
  } = useUrlFilters(initialFilters);

  const isFiltered = searchParams.toString().length > 0;

  return (
    <div>
      <FiltersSection
        filters={initialFilters}
        searchParams={searchParams}
        onSearchChange={handleSearchChange}
        onStatusChange={handleSingleFilter}
        onDateRangeChange={handleDateRangeChange}
        totalCount={pagination.count}
        isSearchAndDate={true}
      />

      {data.length > 0 ? (
        <>
          <OrdersSection orders={data} />
          <div className="flex justify-center mt-4">
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <StatusState
          image={
            isFiltered
              ? "/illustrations/search-empty.png"
              : "/illustrations/empty-orders.png"
          }
          description={
            isFiltered
              ? "Seçilen filtrelere ait sipariş bulunamadı."
              : "Henüz bir sipariş bulunamamaktadır."
          }
          actions={
            isFiltered ? (
              <Button
                text="Filtreleri Temizle"
                variant="secondary"
                padding="sm"
                size="base"
                textSize="sm"
                onClick={handleResetFilters}
                className="w-full"
              />
            ) : (
              <Button
                text="Ana Sayfaya Git"
                variant="brand"
                padding="sm"
                size="base"
                textSize="sm"
                onClick={() => router.push("/")}
                className="w-full"
              />
            )
          }
        />
      )}
    </div>
  );
}
