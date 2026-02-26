import { PromotedCategory } from "../../../mainpage.types";
import { CategoryCard } from "./CategoryCard";

interface PromotedCategoriesProps {
  categories: PromotedCategory[];
  className?: string;
}

export default function PromotedCategories({
  categories,
  className
}: PromotedCategoriesProps) {

  return (
    <div
      className={`grid grid-cols-4 gap-2 w-full md:w-129.5 md:h-69 ${className}`}
      style={{ rowGap: "8px", columnGap: "8px" }}
    >
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          title={category.title}
          backgroundImage={category.image}
          slug={`/${category.slug}`}
        />
      ))}

      {/* 12. Kart : Explore All */}
      <CategoryCard
        title="Tüm Oyunları Keşfet"
        slug="/products"
      />
    </div>
  );
}
