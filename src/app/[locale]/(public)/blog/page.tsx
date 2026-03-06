import AllBlogSection from "@/features/blog/section/AllBlogSection";
import HeroSection from "@/features/blog/section/HeroSection";
import MostReadSection from "@/features/blog/section/MostReadSection";
import { blogListMock } from "@/mocks/blogs.mock";


export default function BlogPage() {
  return (
    <div>
      <p>Ana Sayfa = Blog</p>
      <HeroSection data={blogListMock.hero} />
      <MostReadSection data={blogListMock.popular}/>
      <AllBlogSection data={blogListMock.blogs} pagination={blogListMock.pagination}/>
    </div>

  );
}
