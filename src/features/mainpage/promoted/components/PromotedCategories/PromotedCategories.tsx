import { NavCard } from "@/components/common/NavLinks";
import { PromotedCategory } from "../../../mainpage.types";

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
        <NavCard
          key={category.id}
          title={category.title}
          backgroundImage={category.image}
          href={`/categories/${category.slug}`}
          variant="centered"
          className="aspect-[123.5/86.66]"
        />
      ))}

      {/* 12. Kart : Explore All */}
      <NavCard
        title="Tüm Oyunları Keşfet"
        backgroundImage="/image/brand-bg.png"
        href="/categories"
        variant="centered"
        className="aspect-[123.5/86.66]"
      />
    </div>
  );
}
