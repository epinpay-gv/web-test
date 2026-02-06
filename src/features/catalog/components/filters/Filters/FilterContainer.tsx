"use client";
import Title from "@/components/common/Title/Title";
import { TitleData } from "@/components/common/Title/types";
import { FilterGroupConfig } from "./types";
import FilterGroup from "./FilterGroup";

interface FiltersProps {
  titleData: TitleData;
  filters: FilterGroupConfig[];
}

export default function Filters({ titleData, filters }: FiltersProps) {
  return (
    <>
      <div className="blue-container container max-w-77 p-6 space-y-4">
        <Title data={titleData} />
        {filters.map((group, index) => (
          <FilterGroup key={index} config={group} />
        ))}
      </div>
    </>
  );
}
