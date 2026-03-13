"use client";
import { Pagination, Button, Badge } from "@/components/common";
import { Raffle } from "@/components/common/Cards/RaffleCard/types";
import StatusState from "@/components/common/StatusState/StatusState";
import { useUrlFilters } from "@/features/catalog/hooks";
import { FilterGroupConfig } from "@/features/filters/filters.types";
import { getActiveFilterLabels } from "@/features/filters/utils/filters.utils";
import { RaffleGrid } from "@/features/user/components";
import { PaginationData } from "@/types/types";
import { useRouter } from "next/navigation";

interface RafflesClientProps {
  data: Raffle[];
  initialFilters: FilterGroupConfig[];
  pagination: PaginationData;
}

export default function RafflesClient({
  data,
  initialFilters,
  pagination,
}: RafflesClientProps) {
  const router = useRouter();
  const {
    searchParams,
    handleTypeChange,
    handlePageChange,
    handleSetPriceRange,
    handleToggleBoolean,
  } = useUrlFilters(initialFilters);

  const tabFilters = initialFilters.find((g) => g.isTab);
  const raffleTypeTabFilters =
    tabFilters?.elements?.[0]?.type === "checkbox"
      ? tabFilters.elements[0].options.map((opt) => ({
          label: opt.label,
          value: opt.value,
          key: tabFilters.elements[0].key,
        }))
      : [];

  if (data.length === 0) {
    return (
      <StatusState
        image="/image/orders/empty-orders.png"
        title="Çekiliş Yok."
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
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-wrap gap-2 w-full cursor-pointer">
          {raffleTypeTabFilters.map((i) => (
            <Badge
              key={i.value}
              text={i.label}
              size="lg"
              onClick={() => handleTypeChange(i.value)}
              closable
              onClose={() => {
                // handleToggleBoolean(i.key, i.value);
              }}
            />
          ))}
        </div>

        <RaffleGrid data={data} onCardClick={(card: Raffle) => {}} />

        <div className="mx-auto">
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
}
