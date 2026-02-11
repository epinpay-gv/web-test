"use client";
import { CategoryCard } from "@/components/common";
import { Category, PaginationData } from "@/types/types";

interface CategoryGridProps {
  data: Category[];
  pagination: PaginationData;
}

export default function CategoryGrid({ data }: CategoryGridProps) {
  return (
    <>
      <div className="mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 auto-rows-max">
        {data.map((category) => (
          <CategoryCard category={category} key={category.id} />
        ))}
      </div>
    </>
  );
}
