import { BlogHeroSection } from "@/features/blog/blog.types";
import BlogListItemCard from "../cards/BlogListItemCard";
import FeaturedCard from "../cards/FeaturedCard";

interface Props {
  data: BlogHeroSection;
}

export default function HeroSection({ data }: Props) {
  return (
    <div className="bg-(--bg-brand-softer) w-full">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-(--text-heading) font-semibold text-[20px]">Blog</h1>
          <p className="text-(--text-body) text-[14px]">Epinpay'den Haberler</p>
        </div>
        <div className="flex gap-6 mt-6">
          <FeaturedCard data={data.featured} />
         <div className="flex flex-col gap-3">
  {data.sideList.map((item) => (
    <BlogListItemCard key={item.id} data={item} />
  ))}
</div>
        </div>
      </div>
    </div>
  );
}