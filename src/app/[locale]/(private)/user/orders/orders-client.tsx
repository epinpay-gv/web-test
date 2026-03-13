"use client";
import { Pagination, Button } from "@/components/common";
import StatusState from "@/components/common/StatusState/StatusState";
import { FilterGroupConfig } from "@/features/filters/filters.types";
import { useUrlFilters } from "@/features/filters/hooks/useUrlFilters";
import {
  FiltersSection,
  OrdersSection,
} from "@/features/user/components/orders";
import { Order, OrderStatusTab } from "@/features/user/user.types";
import { PaginationData } from "@/types/types";
import { useRouter} from "next/navigation";

interface OrdersClientProps {
  data: Order[];
  pagination: PaginationData;
  hasAnyOrders: boolean;
  initialFilters: FilterGroupConfig[];
}

export default function OrdersClient({
  data,
  pagination,
  hasAnyOrders,
  initialFilters
}: OrdersClientProps) {
    const {
      searchParams,
      isPending,
      handleTypeChange,
      handleToggleFilter,
      handleSetPriceRange,
      handleToggleBoolean,
      handleResetFilters,
      handlePageChange,
      handleSortChange,
    } = useUrlFilters(initialFilters);
  
  const router = useRouter();
  const search = searchParams.get("search") ?? "";
  const status = (searchParams.get("status") ?? "ALL") as OrderStatusTab;
  const dateFrom = searchParams.get("dateFrom") ?? undefined;
  const dateTo = searchParams.get("dateTo") ?? undefined;
  const date = dateFrom || dateTo ? { from: dateFrom, to: dateTo } : undefined;

  const isFiltered = !!(
    search.trim() ||
    dateFrom ||
    dateTo ||
    status !== "ALL"
  );

  if (!hasAnyOrders) {
    return (
      <StatusState
        image="/image/orders/empty-orders.png"
        title="Sipariş Yok."
        description="Henüz bir sipariş bulunamamaktadır."
        actions={
          <Button
            text="Ana Sayfaya Git"
            variant="secondary"
            padding="sm"
            size="base"
            textSize="sm"
            onClick={() => router.push("/")}
          />
        }
      />
    );
  }

  return (
    <div>
      <FiltersSection
        search={search}
        onSearchChange={(value) => updateQuery({ search: value })}
        selectedStatus={status}
        onStatusChange={(s) => updateQuery({ status: s })}
        selectedDate={date}
        totalCount={pagination.count}
        onDateChange={(d) => updateQuery({ dateFrom: d?.from, dateTo: d?.to })}
      />

      {data ? (
        <>
          <OrdersSection orders={data} />
          <Pagination
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <StatusState
          image="/image/orders/empty-orders.png"
          description={
            search.trim()
              ? `"${search.trim()}" aramasına ait sonuç bulunamadı.`
              : isFiltered
                ? "Seçilen filtrelere ait sipariş bulunamadı."
                : "Henüz bir sipariş bulunamamaktadır."
          }
        />
      )}
    </div>
  );
}
