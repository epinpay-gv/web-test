"use client";
import { OrderDetailHeader } from "@/features/user/components/orders/OrdersDetailSection/OrderDetailHeader";
import { OrderProductCard } from "@/features/user/components/orders/OrdersDetailSection/OrderProductCard";
import { Raffle } from "@/components/common/Cards/RaffleCard/types";

interface RaffleDetailClientProps {
  data: Raffle;
}

export default function RaffleDetailClient({ data }: RaffleDetailClientProps) {
  return (
    <div className="rounded-2xl bg-(--bg-neutral-primary-soft) border border-(#1D303A) px-3 py-3 flex flex-col divide-y">
      <div>
        {/* <OrderDetailHeader order={order} /> */}
      </div>
      {/* <div className="flex flex-col">
        {order.products.map((data) => (
          <OrderProductCard key={product.id} orderId={order.id} product={product} />
        ))}
      </div> */}
    </div>
  );
}