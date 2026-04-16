"use client";
import { Pagination, Button } from "@/components/common";
import StatusState from "@/components/common/StatusState/StatusState";
import { useUrlFilters } from "@/features/filters/hooks/useUrlFilters";
import { FiltersSection, OrdersSection } from "@/features/user/components";
import { useOrders } from "@/features/user/hooks/useOrders";
import { useRouter } from "next/navigation";

export default function OrdersClient() {
  const router = useRouter();
  const { orders, meta, isLoading } = useOrders();

  const {
    searchParams,
    handleSearchChange,
    handleSingleFilter,
    handleDateRangeChange,
    handlePageChange,
    handleResetFilters,
  } = useUrlFilters([]);

  const isFiltered = searchParams.toString().length > 0;

  const pagination = meta
    ? {
        count: meta.total,
        per_page: meta.limit,
        current_page: meta.page,
        total_page: Math.ceil(meta.total / meta.limit),
        has_more: meta.page < Math.ceil(meta.total / meta.limit),
      }
    : null;

  if (isLoading) return null; // TODO: skeleton

  return (
    <div>
      <FiltersSection
        filters={[]}
        searchParams={searchParams}
        onSearchChange={handleSearchChange}
        onStatusChange={handleSingleFilter}
        onDateRangeChange={handleDateRangeChange}
        totalCount={meta?.total ?? 0}
        isSearchAndDate={true}
      />

      {orders.length > 0 ? (
        <>
          <OrdersSection orders={orders} />
          {pagination && (
            <div className="flex justify-center mt-4">
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </div>
          )}
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
