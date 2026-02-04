"use client";

import TimeRangeTabs from "@/components/common/NavLinks/NavTabs/TimeRangeTabs";
import { mockProducts } from "@/mocks";
import { useState } from "react";
import { ProductCarousel } from "./ProductCarousel";

const TIME_RANGES = [
  { label: "Son 24 Saat", value: "24h" },
  { label: "Son 7 Gün", value: "7d" },
  { label: "Son 30 Gün", value: "30d" },
];

export default function BestSellers() {
  const [range, setRange] = useState("24h");

  return (
    <div>
      <h1 className="text-(--text-heading) text-[24px] font-semibold py-4">
        En Çok Satanlar
      </h1>

      <TimeRangeTabs
        items={TIME_RANGES}
        activeValue={range}
        onChange={setRange}
        containerClassName="inline-flex items-center w-[341px] h-[56px] gap-3 rounded-[16px] bg-(--bg-neutral-primary-soft) p-2"
        tabClassName="flex items-center justify-center text-xs rounded-lg transition"
        activeTabClassName="bg-(--bg-brand) w-[113px] h-[40px] text-black rounded-[12px]"
        inactiveTabClassName="w-[113px] h-[40px] text-(--text-body)"
      />
      
      <ProductCarousel
        products={mockProducts}
        showControls={false}
        loop={false}
      />
    </div>
  );
}