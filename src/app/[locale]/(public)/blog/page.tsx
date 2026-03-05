import AllBlogSection from "@/features/blog/section/AllBlogSection";
import HeroSection from "@/features/blog/section/HeroSection";
import PopularSection from "@/features/blog/section/PopularSection";
import { blogListMock } from "@/mocks/blogs.mock";


export default function BlogPage() {
  return (
    <div>
      <p>Ana Sayfa = Blog</p>
      <HeroSection data={blogListMock.hero} />
      <PopularSection data={blogListMock.popular}/>
      <AllBlogSection data={blogListMock.blogs}/>
    </div>

  );
}
