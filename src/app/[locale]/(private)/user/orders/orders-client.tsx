"use client";

import { Pagination, Button } from "@/components/common";
import StatusState from "@/components/common/StatusState/StatusState";
import { Modal } from "@/components/common/Modal/Modal";
import { FiltersSection, OrdersSection } from "@/features/user/components/orders";
import { Order, OrderStatusTab } from "@/features/user/user.types";
import { PaginationData } from "@/types/types";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

type ErrorType = "load" | "access_denied" | "view" | null;

interface OrdersClientProps {
  data: Order[];
  pagination: PaginationData;
  hasAnyOrders: boolean;
  error?: ErrorType;
}

export default function OrdersClient({ data, pagination, hasAnyOrders, error }: OrdersClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const status = (searchParams.get("status") ?? "ALL") as OrderStatusTab;
  const date = searchParams.get("date") ?? undefined;

  const hasResults = data.length > 0;
  const isFiltered = !!(search.trim() || date || status !== "ALL");

  const updateQuery = useCallback(
    (patch: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(patch).forEach(([key, value]) => {
        if (value === undefined || value === "" || value === "ALL") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      if (!("page" in patch)) params.set("page", "1");

      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router]
  );

  return (
    <div>
      <Modal
        open={error === "load"}
        title="Siparişler Yüklemedi"
        confirmText="Sayfayı Yenile"
        onConfirm={() => router.refresh()}
        onClose={() => router.refresh()}
      />
      <Modal
        open={error === "access_denied"}
        title="Bu siparişe erişiminiz yok"
        confirmText="Ana sayfaya dön"
        onConfirm={() => router.push("/")}
        onClose={() => router.push("/")}
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
          {!hasAnyOrders && (
            <StatusState
              image="/image/orders/empty-orders.png"
              title="Sipariş Yok."
              description="Henüz bir sipariş bulunamamaktadır."
              actions={
                <Button text="Ana Sayfaya Git" variant="secondary" padding="sm" size="base" textSize="sm" onClick={() => router.push("/")} />
              }
            />
          )}

          {hasAnyOrders && (
            <>
              <FiltersSection
                search={search}
                onSearchChange={(value) => updateQuery({ search: value })}
                selectedStatus={status}
                onStatusChange={(s) => updateQuery({ status: s })}
                selectedDate={date}
                totalCount={pagination.count}
                onDateChange={(d) => updateQuery({ date: d })}
              />

              {hasResults ? (
                <>
                  <OrdersSection orders={data} />
                  <Pagination
                    pagination={pagination}
                    onPageChange={(p) => {
                      updateQuery({ page: String(p) });
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
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
            </>
          )}
        </>
      )}
    </div>
  );
}