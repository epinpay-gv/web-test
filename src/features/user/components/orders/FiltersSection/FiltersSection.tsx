"use client";

import OrderSearch from "./OrdersSearch";
import Badge from "@/components/common/Badges/Badge";
import { DatePicker } from "@/components/common/Calendar/DateRangePicker";
import {
  ORDER_STATUS_TABS,
  ORDER_STATUS_TAB_LABELS,
  OrderStatusTab,
} from "@/features/user/user.types";

interface FiltersSectionProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedStatus: OrderStatusTab;
  onStatusChange: (status: OrderStatusTab) => void;
  selectedDate?: { from?: string; to?: string };
  onDateChange: (date?: { from?: string; to?: string }) => void;
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
  return (
    <div className="flex flex-col gap-3 mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        {typeof totalCount === "number" && (
          <span className="text-xs md:text-sm text-(--text-body) sm:mr-auto">
            {totalCount} sipariş listeleniyor
          </span>
        )}
        <OrderSearch value={search} onChange={onSearchChange} />
        <DatePicker value={selectedDate} onChange={onDateChange} />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
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