"use client";
import { ProductDetailCard } from "@/features/user/components";
import DetailPageHeader from "@/features/user/components/common/DetailPageHeader/DetailPageHeader";
import { useOrderDetail } from "@/features/user/hooks/useOrderDetail";
import { bffOrderToDetailHeader } from "@/features/user/utils/detail-header.adapters";

interface OrderDetailClientProps {
  id: string;
}

export default function OrderDetailClient({ id }: OrderDetailClientProps) {
  const { order, isLoading } = useOrderDetail(id);

  if (isLoading) return null; // TODO: skeleton
  if (!order) return null;

  const allItems = order.sellers?.flatMap((seller) =>
    seller.items.map((item) => ({ ...item, storeName: seller.storeName }))
  ) ?? [];

  return (
    <div className="rounded-2xl bg-(--bg-neutral-primary) border border-(#1D303A) px-3 py-3 flex flex-col divide-y">
      <DetailPageHeader data={bffOrderToDetailHeader(order)} />
      <div className="flex flex-col">
        {allItems.map((item) => (
          <ProductDetailCard
            key={item.id}
            orderId={order.id}
            product={item}
          />
        ))}
      </div>
    </div>
  );
}
