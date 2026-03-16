"use client";
import { DetailPageHeader } from "@/features/user/components";
import { raffleToDetailHeader } from "@/features/user/utils/detail-header.adapters";
import { Raffle } from "@/types/types";

interface RaffleDetailClientProps {
  data: Raffle;
}

export default function RaffleDetailClient({ data }: RaffleDetailClientProps) {
  return (
    <div className="rounded-2xl bg-(--bg-neutral-primary-soft) border border-(#1D303A) px-3 py-3 flex flex-col divide-y">
      <div>
        <DetailPageHeader data={raffleToDetailHeader(data)} />
      </div>
      <div className="flex flex-col">
        {/* {data.rewards?.map((data) => (
          <ProductDetailCard key={data.id} orderId={data.offerId} product={data.productId} />
        ))} */}
      </div>
    </div>
  );
}