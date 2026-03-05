import { BlogCard } from "../blog.types";

interface Props {
  data: Pick<BlogCard, "title" | "thumbnail" | "publishedAt">;
  imagePosition?: "left" | "right";
}

export default function BlogListItemCard({ data, imagePosition = "left" }: Props) {
  return (
    <div className={`flex gap-2 h-29 shrink-0 ${imagePosition === "right" ? "flex-row-reverse" : "flex-row"}`}>
      <img
        src={data.thumbnail}
        alt={data.title}
        className=" object-cover rounded-xs shrink-0 w-[116.25px] h-[116.25px]"
      />
      <div className="flex flex-col gap-2 justify-start w-76">
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