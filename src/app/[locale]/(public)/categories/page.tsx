import { createSeo } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/seo/common/BreadcrumbSchema";
import { getCategories } from "@/features/catalog/service";
import CategoriesClient from "./categories-client";
import { createCategoriesBreadcrumb } from "@/features/catalog/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return createSeo({
    title: locale === "en" ? "All Categories" : "Tüm Kategoriler",
    description:
      locale === "en" ? "Browse all categories" : "Tüm kategorileri keşfedin",
    canonical: "/categories",
    locale: locale,
  });
}

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const res = await getCategories(new URLSearchParams());

  const breadcrumbItems = createCategoriesBreadcrumb(locale);

  return (
    <>
      {/* SEO Content */}
      <BreadcrumbSchema items={breadcrumbItems} baseUrl={""} locale={""} />

      {/* Page Content */}
      <CategoriesClient data={res.data} pagination={res.pagination} breadcrumbItems={breadcrumbItems} />
    </>
  );
}
