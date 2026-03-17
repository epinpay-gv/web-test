"use client";
import {
  DetailPageHeader,
  ProductDetailCard,
} from "@/features/user/components";
import { Order } from "@/features/user/user.types";
import { orderToDetailHeader } from "@/features/user/utils/detail-header.adapters";
interface OrderDetailClientProps {
  order: Order;
}

export default function OrderDetailClient({ order }: OrderDetailClientProps) {
  return (
    <div className="rounded-2xl bg-(--bg-neutral-primary) border border-(#1D303A) px-3 py-3 flex flex-col divide-y">
      <DetailPageHeader data={orderToDetailHeader(order)} />

      <div className="flex flex-col">
        {order.products.map((product) => (
          <ProductDetailCard
            key={product.id}
            orderId={order.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
