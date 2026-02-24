"use client";
import { Pagination } from "@/components/common";
import StatusState from "@/components/common/StatusState/StatusState";
import {
  FiltersSection,
  OrdersSection,
} from "@/features/user/components/orders";
import { Order } from "@/features/user/user.types";
import { PaginationData } from "@/types/types";
import { useState } from "react";

interface OrdersClientProps {
  data: Order[];
  pagination: PaginationData;
}

export default function OrdersClient({ data, pagination }: OrdersClientProps) {
  const [paginationState, setPaginationState] =
    useState<PaginationData>(pagination);
  const [page, setPage] = useState(1);

  return (
    <div>
      {/* <User /> */}
      {data && (
        <>
          <FiltersSection />
          <OrdersSection orders={[]} />
          <div className="mx-auto">
            <Pagination
              pagination={paginationState}
              onPageChange={(page) => {
                setPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        </>
      )}
      {!data && <StatusState image="/image/orders/empty-orders.png"  
      title="Henüz bir siparişiniz bulunmamaktadır." description="Sipariş verdiğiniz ürünler burada listelenecektir."
 />}
    </div>
  );
}
