import { BlogCard } from "../blog.types";

interface Props {
  data: Pick<BlogCard, "title" | "thumbnail" | "publishedAt">;
  imagePosition?: "left" | "right";
}

export default function BlogListItemCard({ data, imagePosition = "left" }: Props) {
  return (
    <div className={`flex gap-2 h-[68px] lg:h-[116px] ${imagePosition === "right" ? "flex-row-reverse" : "flex-row"}`}>
      <img
        src={data.thumbnail}
        alt={data.title}
         className="w-[68px] h-[68px] lg:w-[116px] lg:h-[116px] object-cover rounded-xs flex-shrink-0"
      />
      <div className="flex flex-col lg:gap-2 gap-1 justify-start lg:w-76 w-[240px]">
        <p className="text-(--text-heading) font-semibold text-[16px] line-clamp-2">
          {data.title}
        </p>
        <span className="text-(--text-heading) text-[12px]">
          {data.publishedAt}
        </span>
      </div>
    </div>
  );
}