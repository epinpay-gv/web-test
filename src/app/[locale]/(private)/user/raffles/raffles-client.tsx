"use client";
import { Pagination, Button } from "@/components/common";
import { Raffle } from "@/components/common/Cards/RaffleCard/types";
import StatusState from "@/components/common/StatusState/StatusState";
import { FilterGroupConfig } from "@/features/filters/filters.types";
import { useUrlFilters } from "@/features/filters/hooks/useUrlFilters";
import { RaffleGrid } from "@/features/user/components";
import FiltersSection from "@/features/user/components/FiltersSection";
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
    handleSearchChange,
    handleSingleFilter,
    handleDateRangeChange,
    handlePageChange,
    handleResetFilters,
  } = useUrlFilters(initialFilters);

  const isFiltered = searchParams.toString().length > 0;

  return (
    <div>
      <FiltersSection
        filters={initialFilters}
        searchParams={searchParams}
        onSearchChange={handleSearchChange}
        onStatusChange={handleSingleFilter}
        onDateRangeChange={handleDateRangeChange}
        totalCount={pagination.count}
      />

      {data.length > 0 ? (
        <>
          <RaffleGrid
            data={data}
            onCardClick={(card: Raffle) => {
              console.log("clicked card:", card); 
              console.log("full data array:", data); 
              router.push(`/user/raffles/${card.id}`);
            }}
          />
          <div className="flex justify-center mt-4">
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <StatusState
          image={
            isFiltered
              ? "/illustrations/search-empty.png"
              : "/illustrations/empty-orders.png"
          }
          description={
            isFiltered
              ? "Seçilen filtrelere ait çekiliş bulunamadı."
              : "Henüz bir çekiliş bulunmamaktadır."
          }
          actions={
            isFiltered ? (
              <Button
                text="Filtreleri Temizle"
                variant="secondary"
                padding="sm"
                size="base"
                textSize="sm"
                onClick={handleResetFilters}
                className="w-full"
              />
            ) : (
              <Button
                text="Çekilişlere Git"
                variant="brand"
                padding="sm"
                size="base"
                textSize="sm"
                onClick={() => router.push("/raffles")}
                className="w-full"
              />
            )
          }
        />
      )}
    </div>
  );
}
