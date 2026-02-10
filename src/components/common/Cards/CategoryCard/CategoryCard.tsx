import { Category } from "@/types/types";
import Image from "next/image";
import Link from 'next/link'
interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={category.translation.slug} className="category-card-container p-3 gap-1">
      {/* Image  */}
      <Image
        src={category.translation.imgUrl}
        alt={category.translation.imgAlt}
        width={200}
        height={200}
      />

      {/* Content  */}
      <p className="text-sm text-start font-medium">{category.translation.name}</p>
    </Link>
  );
}
