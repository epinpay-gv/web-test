import { PromotedCategory } from "../../../mainpage.types";
import { CategoryCard } from "./CategoryCard";

interface PromotedCategoriesProps {
  categories: PromotedCategory[];
}

export default function PromotedCategories({
  categories,
}: PromotedCategoriesProps) {

  return (
    <div
      className="grid grid-cols-4 gap-2 w-full md:w-129.5 md:h-69"
      style={{ rowGap: "8px", columnGap: "8px" }}
    >
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          title={category.title}
          backgroundImage={category.image}
          slug={`/categories/${category.slug}`}
        />
      ))}

      {/* 12. Kart : Explore All */}
      <CategoryCard
        title="Tüm Oyunları Keşfet"
        backgroundImage="/image/brand-bg.png"
        slug="/categories"
      />
    </div>
  );
}
