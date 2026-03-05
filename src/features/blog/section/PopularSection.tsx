import { BlogPopularItem } from "../blog.types";
import BlogListItemCard from "../cards/BlogListItemCard";

interface Props {
  data: BlogPopularItem[];
}

const rankImages: Record<number, string> = {
  1: "/image/blog/1.png",
  2: "/image/blog/2.png",
  3: "/image/blog/3.png",
  4: "/image/blog/4.png",
  5: "/image/blog/5.png",
  6: "/image/blog/6.png",
};

export default function PopularSection({ data }: Props) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-(--text-heading) font-semibold text-[20px] mb-6">
        En Çok Okunanlar
      </h2>
<div className="grid grid-cols-2 gap-6">
  {data.map((item) => (
    <div key={item.id} className="flex items-start gap-6">
      <img
        src={rankImages[item.rank]}
        alt={`${item.rank}. sıra`}
        className="w-8 h-10 object-contain shrink-0"
      />
      <BlogListItemCard
        data={item}
        imagePosition="right"
      />
    </div>
  ))}
</div>
    </div>
  );
}