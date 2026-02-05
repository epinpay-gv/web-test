"use client";
import Title from "@/components/common/Title/Title";
import { FilterGroupConfig } from "./types";
import FilterElement from "./FilterElement";

interface FilterGroupProps {
  config: FilterGroupConfig;
}

export default function FilterGroup({ config }: FilterGroupProps) {
  const { titleData, elements } = config;

  return (
    <div className="space-y-4">
      {titleData && <Title data={titleData} />}

      <div className="space-y-4">
        {elements.map((el) => (
          <FilterElement key={el.key} config={el} />
        ))}
      </div>
    </div>
  );
}
