import { Breadcrumb } from "@/components/common";
import AllBlogSection from "@/features/blog/section/AllBlogSection";
import HeroSection from "@/features/blog/section/HeroSection";
import MostReadSection from "@/features/blog/section/MostReadSection";
import { blogListMock } from "@/mocks/blogs.mock";


export default function BlogPage() {
  return (
    <div>
      <div className="max-w-5xl mx-auto pl-4">
      <Breadcrumb
  items={[
    { name: "Ana Sayfa", href: "/" },
    { name: "Blog", href: "/blog" },
  ]}
/>
</div>
      <HeroSection data={blogListMock.hero} />
      <MostReadSection data={blogListMock.popular}/>
      <AllBlogSection data={blogListMock.blogs} pagination={blogListMock.pagination}/>
    </div>

  );
}
