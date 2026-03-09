import { createSeo } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/seo/common/BreadcrumbSchema";
import { getCategories } from "@/features/catalog/service";
import CategoriesClient from "./categories-client";
import { createCategoriesBreadcrumb } from "@/features/catalog/utils";
import {
  CollectionPageSchema,
  OrganizationSchema,
  WebsiteSchema,
} from "@/components/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const res = await getCategories(new URLSearchParams());

  return createSeo({
    title: res.metadata.title,
    description: res.metadata.metaDescription,
    canonical: `/${locale}/categories`,
    locale: locale,
  });
}

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/categories`;

  const res = await getCategories(new URLSearchParams());

  const breadcrumbItems = createCategoriesBreadcrumb(locale);

  //SEO ITEMS
    const seoCollectionItems = res.data.slice(0, 4).map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: `${pageUrl}/${product.translation.slug}`,
  }));

  return (
    <>
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
      <CategoriesClient
        data={res.data}
        pagination={res.pagination}
        breadcrumbItems={breadcrumbItems}
      />
    </>
  );
}
