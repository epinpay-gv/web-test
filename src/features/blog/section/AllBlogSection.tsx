import { BlogCard } from "../blog.types";
import BlogGridCard from "../cards/BlogGridCard";

interface Props {
  data: BlogCard[];
}

export default function AllBlogSection({ data }: Props) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-(--text-heading) font-semibold text-[20px] mb-6">
        Tüm Yazılar
      </h2>

      <div className="grid grid-cols-4 gap-6">
        {data.map((item) => (
          <BlogGridCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}