
import BlogDetailContentSection from "@/features/blog/section/BlogDetailContent";
import BlogDetailHeroSection from "@/features/blog/section/BlogDetailHeroSection";
import PopularSection from "@/features/blog/section/PopularSection";
import { blogDetailMock, blogListMock } from "@/mocks/blogs.mock";

export default function BlogDetailPage() {
  const blog = blogDetailMock;

  return (
    <>
      <BlogDetailHeroSection data={blog} />
      <BlogDetailContentSection data={blog} />
      <PopularSection data={blogListMock.blogs} />
    </>
  );
}