"use client";
import { Filter } from "@/components/common/Filter/types";
import Title from "@/components/common/Title/Title";

interface FiltersProps {
  data: Filter;
}

export default function Filters({ data }: FiltersProps) {
  return (
    <>
      <div className="blue-container container max-w-77 p-6">
        <Title data={{
          title: "Filtrele",
          actionLink: "/",
          actionLinkText: "Temizle",
          isBreadcrumb: false
        }}/>
        {/* <FilterGroup/> */}
      </div>
    </>
  );
}
