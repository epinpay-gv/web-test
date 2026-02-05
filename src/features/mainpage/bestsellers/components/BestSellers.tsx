"use client";
import { mockProducts } from "@/mocks";
import { useState } from "react";
import { ProductCarousel } from "./ProductCarousel";
import NavTabs from "@/components/common/NavLinks/NavTabs/NavTabs";
import Section from "@/components/layout/Section/Section";

const TIME_RANGES = [
  { label: "Son 24 Saat", value: "24h" },
  { label: "Son 7 Gün", value: "7d" },
  { label: "Son 30 Gün", value: "30d" },
];

export default function BestSellers() {
  const [range, setRange] = useState("24h");

  return (
    <Section backgroundClassName="bg-(--bg-brand-softer)">
      <div className="bg-(--bg-brand-softer)">
        <div>
          <h1 className="text-(--text-heading) text-[24px] font-semibold py-4">
            En Çok Satanlar
          </h1>

          <NavTabs
            items={TIME_RANGES}
            activeValue={range}
            onChange={setRange}
            variant="segmented"
            size="base"
          />


          <ProductCarousel
            products={mockProducts}
            showControls={false}
            loop={false}
          />
        </div>
      </div>
    </Section>
  );
}