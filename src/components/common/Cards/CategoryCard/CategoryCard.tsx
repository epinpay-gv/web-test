import { Category } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="card-container w-42.5 h-48.75 md:w-56 md:h-62.25 p-3 gap-1 items-end">
      <Link href={category.translation.slug} className="block h-full">
        {/* Image  */}
        <div className="relative w-full h-50 overflow-hidden rounded-xs">
          <Image
            src={category.translation.imgUrl}
            alt={category.translation.imgAlt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 200px"
          />
        </div>

        {/* Content  */}
        <p className="text-sm text-start font-medium">
          {category.translation.name}
        </p>
      </Link>
    </div>
  );
}
