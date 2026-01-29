import { createSeo } from "@/lib/seo";
import { CategorySchema } from "@/components/seo/CategorySchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return createSeo({
    title: params.locale === "en" ? "All Categories" : "Tüm Kategoriler",
    description:
      params.locale === "en"
        ? "Browse all categories"
        : "Tüm kategorileri keşfedin",
    canonical: "/categories",
    locale: params.locale,
  });
}

export default function CategoriesPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const baseUrl = "https://www.epinpay.com";
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
      <div>
        <h1>CATEGORIES</h1>
      </div>
    </>
  );
}
