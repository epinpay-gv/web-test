import { createSeo } from "@/lib/seo";
import { CategorySchema } from "@/components/seo/CategorySchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { getCategories } from "@/features/catalog/service";
import CategoriesClient from "./categories-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return createSeo({
    title: locale === "en" ? "All Categories" : "Tüm Kategoriler",
    description:
      locale === "en"
        ? "Browse all categories"
        : "Tüm kategorileri keşfedin",
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
  const baseUrl = "https://www.epinpay.com";

  const res = await getCategories(new URLSearchParams());


  return (
    <>
      {/* SEO Content */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Categories", url: `${baseUrl}/${locale}/categories` },
        ]}
      />
      <CategorySchema
        name="Epinpay Categories"
        description="Dijital oyun, epin ve servis kategorileri"
        url={`${baseUrl}/${locale}/categories`}
        locale={locale}
      />

      {/* Page Content */}
      <CategoriesClient data={res.data} pagination={res.pagination}/>
    </>
  );
}
