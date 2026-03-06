import Link from "next/link";
import { BlogCard } from "../blog.types";

interface Props {
  data: BlogCard;
}

export default function BlogGridCard({ data }: Props) {
  return (
    <Link href={`/blog/${data.slug}`}>
    <div className="flex flex-col gap-4 w-42.5 h-88.5 lg:w-61 lg:h-89.5 bg-(--bg-neutral-primary-soft) p-3 rounded-2xl border border-(--border-default)">
      <div className="relative">
        <img
          src={data.thumbnail}
          alt={data.title}
          className="w-full h-30 lg:h-45 object-cover rounded-2xl"
        />
      </div>

      <p className="text-(--text-heading) font-semibold text-[14px] line-clamp-2">
        {data.title}
      </p>

      <p className="text-(--text-body) text-[12px] line-clamp-4">
        {data.description}
      </p>
    </div>
    </Link>
  );
}