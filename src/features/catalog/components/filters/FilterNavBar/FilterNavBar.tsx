"use client";
import { useState } from "react";
import { FilterGroupConfig } from "../Filters/types";

const TIME_RANGES = [
  { label: "Tüm Ürünler", value: "a" },
  { label: "Oyun Pinleri", value: "b" },
  { label: "Cüzdan Kodları ve Hediye Kartları", value: "c" },
  { label: "Konsol ve Abonelik Hizmetleri", value: "d" },
  { label: "Yazılım ve Lisanslar", value: "e" },
  { label: "Skin ve Dijital İtem Pazarı", value: "f" },
];

interface FilterNavBarProps {
  data: FilterGroupConfig;
}

export default function FilterNavBar({ data }: FilterNavBarProps) {
  const [range, setRange] = useState("24h");
  return (
    <>
      <div className="w-full py-8">
        {/* <TimeRangeTabs
          items={TIME_RANGES}
          activeValue={range}
          onChange={setRange}
          containerClassName="w-full inline-flex items-center h-[56px] gap-4 rounded-[16px] bg-(--bg-neutral-primary-soft) p-2 "
          tabClassName="flex w-auto items-center justify-center text-xs rounded-lg transition "
          activeTabClassName="bg-(--bg-brand) h-[40px]  text-black rounded-[12px] px-4"
          inactiveTabClassName="h-[40px] text-(--text-body) px-4"
        /> */}
      </div>
    </>
  );
}
