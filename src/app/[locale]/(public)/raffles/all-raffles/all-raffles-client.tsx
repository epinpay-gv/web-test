/* eslint-disable react/jsx-key */
"use client";
import {
  FilterContainer,
  FilterLabels,
  PageTitle,
} from "@/features/catalog/components";
import { BreadcrumbItem, PaginationData, Raffle } from "@/types/types";
import { Breadcrumb, Pagination, Badge, Modal } from "@/components/common";
import {
  Cash,
  Clock,
  Home,
  Star,
  VideoCamera,
} from "flowbite-react-icons/outline";
import { RaffleGrid } from "@/features/raffles/components";
import { useState } from "react";
import CardModal from "@/components/common/Cards/RaffleCard/CardModal/CardModal";
import { useRaffleActions } from "@/features/raffles/hooks";
import { FilterGroupConfig } from "@/features/filters/filters.types";
import { getActiveFilterLabels } from "@/features/filters/utils/filters.utils";
import { useUrlFilters } from "@/features/filters/hooks/useUrlFilters";

interface AllRafflesClientProps {
  initialRaffles: Raffle[];
  initialFilters: FilterGroupConfig[];
  pagination: PaginationData;
  breadcrumbItems: BreadcrumbItem[];
}

export default function AllRafflesClient({
  initialRaffles,
  initialFilters,
  pagination,
  breadcrumbItems,
}: AllRafflesClientProps) {
  const { joinToTheRaffle } = useRaffleActions();
  const tabIconList = [
    <Clock size={20} className="text-[#D76BBD]" />,
    <Cash size={20} className="text-[#5EE9B5]" />,
    <Star size={20} className="text-[#FFC74F]" />,
    <VideoCamera size={20} className="text-[#FF6D59]" />,
  ];
  const {
    searchParams,
    isPending,
    handleTypeChange,
    handleToggleFilter,
    handleSetPriceRange,
    handleToggleBoolean,
    handleResetFilters,
    handlePageChange,
    handleSortChange,
    handleBulkApply,
  } = useUrlFilters(initialFilters);

  const pageTitle = breadcrumbItems[2]
    ? `${breadcrumbItems[2].name} çekilişleri`
    : "Tüm çekilişler";

  const tabFilters = initialFilters.find((g) => g.isTab);
  const titleFilters = initialFilters.find((g) => g.isTitle);
  const columnFilters = initialFilters.filter((g) => !g.isTab && !g.isTitle);

  const raffleTypeTabFilters =
    tabFilters?.elements?.[0]?.type === "checkbox"
      ? tabFilters.elements[0].options.map((opt, index) => ({
          label: opt.label,
          value: opt.value,
          icon: tabIconList[index],
          key: tabFilters.elements[0].key,
        }))
      : [];

  const activeFilters = getActiveFilterLabels(
    new URLSearchParams(searchParams.toString()),
    initialFilters,
  );
  const activeTypeParam = searchParams.get("type");

  const sortDropdownEl = titleFilters?.elements.find(
    (el) => el.type === "dropdown",
  );
  const defaultSort =
    sortDropdownEl?.type === "dropdown"
      ? (sortDropdownEl.options[0]?.value ?? "")
      : "";
  const currentSort = searchParams.get("sort") ?? defaultSort;

  const [selectedRaffle, setSelectedRaffle] = useState<Raffle | null>(null);

  return (
    <div className="container max-w-7xl mx-auto space-y-4 py-12">
      <div className="px-4 md:px-0">
        <PageTitle
          data={{
            title: pageTitle,
            totalProductAmount: pagination.count,
          }}
          isLoading={isPending}
          titleFilter={titleFilters}
          currentSort={currentSort}
          onSortSelect={handleSortChange}
        />
        <Breadcrumb
          items={breadcrumbItems.map((item, index) => ({
            ...item,
            icon: index === 0 ? <Home size={14} /> : undefined,
          }))}
        />

        <div className="flex md:flex-row flex-col items-start gap-4">
          <FilterContainer
            titleData={{ title: "Filtrele", isUnderlined: true }}
            filters={columnFilters}
            activeFilters={activeFilters}
            resetFilters={handleResetFilters}
            toggleFilter={handleToggleFilter}
            setPriceRange={handleSetPriceRange}
            toggleBoolean={handleToggleBoolean}
            titleFilter={titleFilters}
            currentSort={currentSort}
            onSortSelect={handleSortChange}
            onBulkApply={handleBulkApply}
            searchParams={searchParams}
          />

          <div className="flex-1 flex flex-col gap-4">
            <div className="flex flex-wrap gap-2 w-full">
              {raffleTypeTabFilters.length > 0 &&
                raffleTypeTabFilters.map((i) => (
                  <Badge
                    theme={activeTypeParam !== i.value ? "gray" : "brand"}
                    key={i.value}
                    text={i.label}
                    size="xl"
                    icon={i.icon}
                    onClick={() => handleTypeChange(i.value)}
                    className="cursor-pointer"
                    closable={activeTypeParam === i.value}
                  />
                ))}
            </div>

            {activeFilters.length > 0 && (
              <FilterLabels
                activeFilters={activeFilters}
                resetFilters={handleResetFilters}
                setPriceRange={handleSetPriceRange}
                toggleFilter={handleToggleFilter}
                isLoading={isPending}
              />
            )}

            <RaffleGrid
              data={initialRaffles}
              onCardClick={(raffle) => setSelectedRaffle(raffle)}
            />

            <div className="mx-auto">
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <Modal open={!!selectedRaffle} onClose={() => setSelectedRaffle(null)}>
        {selectedRaffle && (
          <CardModal data={selectedRaffle} joinToTheRaffle={joinToTheRaffle} />
        )}
      </Modal>
    </div>
  );
}
