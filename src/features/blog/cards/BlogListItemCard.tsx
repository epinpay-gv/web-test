import Link from "next/link";
import { BlogCard } from "../blog.types";

interface Props {
  data: Pick<BlogCard, "slug" | "title" | "thumbnail" | "publishedAt">;
  imagePosition?: "left" | "right";
}

export default function BlogListItemCard({ data, imagePosition = "left" }: Props) {
  return (
    <Link href={`/blog/${data.slug}`}>
    <div className={`flex gap-2 h-17 lg:h-29 ${imagePosition === "right" ? "flex-row-reverse" : "flex-row"}`}>
      <img
        src={data.thumbnail}
        alt={data.title}
         className="w-17 h-17 lg:w-29 lg:h-29 object-cover rounded-xs shrink-0"
      />
      <div className="flex flex-col lg:gap-2 gap-1 justify-start lg:w-76 w-60">
        <p className="text-(--text-heading) font-semibold text-[16px] line-clamp-2">
          {data.title}
        </p>
        <span className="text-(--text-heading) text-[12px]">
          {data.publishedAt}
        </span>
      </div>
    </div>
    </Link>
  );
}