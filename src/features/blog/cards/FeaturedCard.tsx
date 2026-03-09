
import Link from "next/link";
import { BlogCard } from "../blog.types";

interface Props {
  data: BlogCard;
}

export default function FeaturedCard({ data }: Props) {
  return (
    <Link href={`/blog/${data.slug}`}>
    <div className="flex flex-col gap-2">
      <img
        src={data.thumbnail}
        alt={data.title}
        className="w-87 h-43.75 lg:w-125 lg:h-63 rounded-xs object-cover"
      />
      <div className="w-87 lg:w-125">
        <h2 className="font-semibold text-[20px] text-(--text-heading) leading-[150%]">
          {data.title}
        </h2>
        <p className="text-[14px] font-medium text-(--text-body) leading-[150%]">
          {data.description}
        </p>
      </div>
    </div>
    </Link>
  );
}