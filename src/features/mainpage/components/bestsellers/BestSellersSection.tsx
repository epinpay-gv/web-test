"use client";

import { useState } from "react";
import { ProductCarousel } from "./ProductCarousel";
import { NavTab } from "@/components/common";
import { Bestsellers } from "../../mainpage.types";

interface BestSellersProps {
  data: Bestsellers;
}

export default function BestSellers({ data }: BestSellersProps) {
  const [range, setRange] = useState("24h");

  return (
    <div className="p-6 bg-(--bg-brand-softer)">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-(--text-heading) text-[24px] font-semibold py-4">
          En Çok Satanlar
        </h1>

        <div className="max-w-87.5">
          <NavTab
            items={data.tabInfo.map((tab) => ({
              label: tab.label,
              value: tab.value,
            }))}
            activeValue={range}
            onChange={(value) => setRange(value)}
            variant="segmented"
            size="base"
          />
        </div>

        <ProductCarousel
          products={data.products[range] || []}
          showControls={false}
          loop={false}
        />
      </div>
    </div>
  );
}
