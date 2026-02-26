"use client";

import { Order } from "@/features/user/user.types";
import { OrderDetailHeader } from "@/features/user/components/orders/OrdersDetailSection/OrderDetailHeader";
// import { OrderProductCard } from "@/features/user/components/orders/OrdersDetailSection/OrderProductCard";

interface OrderDetailClientProps {
  order: Order;
}

export default function OrderDetailClient({ order }: OrderDetailClientProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Sipariş başlık kartı */}
      <OrderDetailHeader order={order} />

      {/* Her ürün için ayrı kart */}
      {/* {order.products.map((product) => (
        <OrderProductCard key={product.id} product={product} />
      ))} */}
    </div>
  );
}