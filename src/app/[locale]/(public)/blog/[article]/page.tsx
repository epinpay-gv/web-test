
import { Breadcrumb } from "@/components/common";
import BlogDetailContentSection from "@/features/blog/section/BlogDetailContent";
import BlogDetailHeroSection from "@/features/blog/section/BlogDetailHeroSection";
import PopularSection from "@/features/blog/section/PopularSection";
import { blogDetailMock, blogListMock } from "@/mocks/blogs.mock";

export default function BlogDetailPage() {
  const blog = blogDetailMock;

  return (
    <>
    <div className="max-w-5xl mx-auto pl-4">
    <Breadcrumb
  items={[
    { name: "Ana Sayfa", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: blog.title, href: `/blog/${blog.slug}` },
  ]}
/>
</div>
      <BlogDetailHeroSection data={blog} />
      <BlogDetailContentSection data={blog} />
      <PopularSection data={blogListMock.blogs} />
    </>
  );
}