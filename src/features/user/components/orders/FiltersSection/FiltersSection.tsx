"use client";

import { useRef } from "react";
import OrderSearch from "./OrdersSearch";
import Badge from "@/components/common/Badges/Badge";
import {
  ORDER_STATUS_TABS,
  ORDER_STATUS_TAB_LABELS,
  OrderStatusTab,
} from "@/features/user/user.types";
import { CalendarWeek } from "flowbite-react-icons/outline";
import { Button } from "@/components/common";

interface FiltersSectionProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedStatus: OrderStatusTab;
  onStatusChange: (status: OrderStatusTab) => void;
  selectedDate?: string;
  onDateChange: (date?: string) => void;
  totalCount?: number;
}

export default function FiltersSection({
  search,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedDate,
  totalCount,
  onDateChange,
}: FiltersSectionProps) {
  const dateInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-3 mb-4">
      {/* Üst satır: sipariş sayısı (sol) + arama & tarih (sağ) */}
      <div className="flex items-center justify-between gap-3">
        {typeof totalCount === "number" && (
          <span className="text-xs md:text-sm text-(--text-body)">
            {totalCount} sipariş listeleniyor
          </span>
        )}

        <div className="flex items-center gap-2 ml-auto">
          <OrderSearch value={search} onChange={onSearchChange} />

          {/* Tarih seçici: input ref ile tetiklenir */}
          <div className="relative">
            <Button
              type="button"
              aria-label="Tarih filtrele"
              onClick={() => dateInputRef.current?.showPicker?.()}
              size="base"
              variant="secondary"
              appearance="outline"
              padding="rounded"
              icon={<CalendarWeek className="w-4 h-4" />}
            />
            <input
              ref={dateInputRef}
              type="date"
              value={selectedDate ?? ""}
              onChange={(e) => onDateChange(e.target.value || undefined)}
              className="absolute inset-0 opacity-0 pointer-events-none"
              tabIndex={-1}
            />
          </div>
        </div>
      </div>

      {/* Alt satır: statü sekmeleri */}
      <div className="flex items-center gap-2">
        {ORDER_STATUS_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onStatusChange(tab)}
            className="focus:outline-none"
          >
            <Badge
              text={ORDER_STATUS_TAB_LABELS[tab]}
              size="sm"
              theme={selectedStatus === tab ? "brand" : "white"}
              type="pill"
              className="rounded-sm"
            />
          </button>
        ))}
      </div>
    </div>
  );
}