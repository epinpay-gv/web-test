"use client";

import { Order } from "@/features/user/user.types";
import { OrderDetailHeader } from "@/features/user/components/orders/OrdersDetailSection/OrderDetailHeader";
import { OrderProductCard } from "@/features/user/components/orders/OrdersDetailSection/OrderProductCard";

interface OrderDetailClientProps {
  order: Order;
}

export default function OrderDetailClient({ order }: OrderDetailClientProps) {
  return (
    <div className="w-227 h-139.5 rounded-2xl bg-(--bg-neutral-primary-soft) border border-(#1D303A) px-3 py-3 flex flex-col divide-y ">
      {/* Header */}
      <div>
        <OrderDetailHeader order={order} />
      </div>
      {/* Products */}
      <div className="flex flex-col">
        {order.products.map((product) => (
          <OrderProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}