import { Breadcrumb } from "@/components/common";
import { BreadcrumbSchema, CollectionPageSchema, OrganizationSchema, WebsiteSchema } from "@/components/seo";
import { getBlog } from "@/features/blog/blog.service";
import AllBlogSection from "@/features/blog/section/AllBlogSection";
import HeroSection from "@/features/blog/section/HeroSection";
import MostReadSection from "@/features/blog/section/MostReadSection";
import { createBlogBreadcrumb } from "@/lib/createBreadcrumb";
import { createSeo } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const res = await getBlog(new URLSearchParams());

  return createSeo({
    title: res.metadata.title,
    description: res.metadata.metaDescription,
    canonical: `/${locale}/blog`,
    locale: locale,
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/blog`;
  const res = await getBlog(new URLSearchParams());
  const breadcrumbItems = createBlogBreadcrumb(locale);

  //SEO ITEMS
  const seoCollectionItems = res.data.blogs
    .slice(0, 4)
    .map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: `${pageUrl}/${article.slug}`,
    }));

  return (
    <>
      {" "}
      {/* SEO Content */}
      <OrganizationSchema locale={locale} description={res.metadata.title} />
      <WebsiteSchema locale={locale} description={res.metadata.title} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <CollectionPageSchema
        pageUrl={pageUrl}
        name={res.metadata.title}
        description={res.metadata.metaDescription}
        locale={locale}
        numberOfItems={4}
        items={seoCollectionItems}
      />
      
      {/* Page Content */}
      <div className="max-w-5xl mx-auto pl-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <HeroSection data={res.data.hero} />
      <MostReadSection data={res.data.popular} />
      <AllBlogSection data={res.data.blogs} pagination={res.pagination} />
    </>
  );
}
