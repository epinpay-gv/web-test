import { Breadcrumb } from "@/components/common";
import {
  BlogSchema,
  BreadcrumbSchema,
  OrganizationSchema,
  WebsiteSchema,
} from "@/components/seo";
import { getArticle } from "@/features/blog/blog.service";
import BlogDetailContentSection from "@/features/blog/section/BlogDetailContent";
import BlogDetailHeroSection from "@/features/blog/section/BlogDetailHeroSection";
import PopularSection from "@/features/blog/section/PopularSection";
import { createArticleBreadcrumb } from "@/lib/createBreadcrumb";
import { createSeo } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; article: string }>;
}) {
  const { locale, article } = await params;

  const res = await getArticle(article);

  return createSeo({
    title: res.metadata.title,
    description: res.metadata.metaDescription,
    canonical: `/${locale}/blog/${article}`,
    locale: locale,
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; article: string }>;
}) {
  const { locale, article } = await params;
  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/blog/${article}`;
  const res = await getArticle(article);
  const breadcrumbItems = createArticleBreadcrumb(
    locale,
    res.metadata.title,
    article,
  );

  //SEO ITEMS

  return (
    <>
      {/* SEO Content */}
      <OrganizationSchema locale={locale} description={res.metadata.title} />
      <WebsiteSchema locale={locale} description={res.metadata?.title} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <BlogSchema
        locale={locale}
        pageUrl={pageUrl}
        headline={res.data.data.title}
        description={res.data.data.description}
        image={res.data.data.thumbnail ?? ""}
      />

      {/* Page Content */}
      <div className="max-w-5xl mx-auto pl-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <BlogDetailHeroSection data={res.data.data} />
      <BlogDetailContentSection data={res.data.data} />
      <PopularSection data={res.data.popular} />
    </>
  );
}
