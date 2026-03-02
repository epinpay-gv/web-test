"use client";

import { Pagination, Button } from "@/components/common";
import StatusState from "@/components/common/StatusState/StatusState";
import { Modal } from "@/components/common/Modal/Modal";
import { FiltersSection, OrdersSection } from "@/features/user/components/orders";
import { Order, OrderStatus } from "@/features/user/user.types";
import { PaginationData } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import { getOrders } from "@/features/user/service";
import { useRouter } from "next/navigation";

type ErrorType = "load" | "access_denied" | "view" | null;

interface Filters {
  search: string;
  date?: string;
  status: "ALL" | OrderStatus;
  page: number;
}

interface OrdersClientProps {
  data: Order[];
  pagination: PaginationData;
}

const DEFAULT_FILTERS: Filters = {
  search: "",
  date: undefined,
  status: "ALL",
  page: 1,
};

export default function OrdersClient({ data, pagination }: OrdersClientProps) {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>(data);
  const [paginationState, setPaginationState] = useState<PaginationData>(pagination);
  const [filters, setFilters] = useState<Filters>({
    ...DEFAULT_FILTERS,
    page: pagination.current_page ?? 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(null);
  const isFirstRender = useRef(true)


  const hasInitialOrders = data.length > 0;
  const hasResults = orders.length > 0;

  const updateFilter = (patch: Partial<Omit<Filters, "page">>) => {
    setFilters((prev) => ({ ...prev, ...patch, page: 1 }));
  };

  const resolveError = (status?: number): ErrorType => {
    if (status === 401 || status === 403) return "access_denied";
    if ((status ?? 0) >= 500) return "view";
    return "load";
  };

  useEffect(() => {
     if (isFirstRender.current) { 
      isFirstRender.current = false;
      return;
    }
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: String(filters.page),
        perPage: String(paginationState.per_page),
        ...(filters.search.trim() && { search: filters.search.trim() }),
        ...(filters.date && { date: filters.date }),
        ...(filters.status !== "ALL" && { status: filters.status }),
      });

      try {
        const res = await getOrders(params);
        setOrders(res.data);
        setPaginationState(res.pagination);
      } catch (err: unknown) {
        const status = (err as { status?: number })?.status;
        setError(resolveError(status));
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [filters, paginationState.per_page]);

  return (
    <div>
      <Modal
        open={error === "load"}
        title="Siparişler Yüklemedi"
        confirmText="Sayfayı Yenile"
        onConfirm={() => router.refresh()}
        onClose={() => setError(null)}
      />

      <Modal
        open={error === "access_denied"}
        title="Bu siparişe erişiminiz yok"
        confirmText="Ana sayfaya dön"
        onConfirm={() => router.push("/")}
        onClose={() => setError(null)}
      />

      {error === "view" && (
        <StatusState
          image="/image/orders/empty-orders.png"
          title="Sipariş Görüntülenemiyor."
          description="Siparişleriniz şu anda görüntülenemiyor."
          actions={
            <>
              <Button text="Ana Sayfaya Git" variant="secondary" padding="sm" size="base" textSize="sm" onClick={() => router.push("/")} />
              <Button text="Sayfayı Yenile" variant="dark" padding="sm" size="base" textSize="sm" onClick={() => router.refresh()} />
            </>
          }
        />
      )}

      {!error && (
        <>
          {hasInitialOrders && (
            <>
              <FiltersSection
                search={filters.search}
                onSearchChange={(value) => updateFilter({ search: value })}
                selectedStatus={filters.status}
                onStatusChange={(status) => updateFilter({ status })}
                selectedDate={filters.date}
                totalCount={paginationState.count}
                onDateChange={(date) => updateFilter({ date })}
                isLoading={isLoading}
              />

              {hasResults ? (
                <>
                  <OrdersSection orders={orders} />
                  <Pagination
                    pagination={paginationState}
                    onPageChange={(page) => {
                      setFilters((prev) => ({ ...prev, page }));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                </>
              ) : (
                !isLoading && (
                  <StatusState
                    image="/image/orders/empty-orders.png"
                    description={
                      filters.search.trim()
                        ? `"${filters.search.trim()}" aramasına ait sonuç bulunamadı.`
                        : "Henüz bir sipariş bulunamamaktadır."
                    }
                  />
                )
              )}
            </>
          )}

          {!hasInitialOrders && !isLoading && (
            <StatusState
              image="/image/orders/empty-orders.png"
              title="Sipariş Yok."
              description="Henüz bir sipariş bulunamamaktadır."
              actions={
                <Button text="Ana Sayfaya Git" variant="secondary" padding="sm" size="base" textSize="sm" onClick={() => router.push("/")} />
              }
            />
          )}
        </>
      )}
    </div>
  );
}