import { createSeo } from "@/lib/seo";
import { CategorySchema } from "@/components/seo/CategorySchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { getCategory } from "@/features/catalog/service";
import CategoryClient from "./category-client";

type Params = {
  locale: string;
  category: string;
};

type Props = {
  params: Promise<Params>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, category } = await params;
  const name = category.replace(/-/g, " ");

  return createSeo({
    title: locale === "en" ? `${name} Products` : `${name} Ürünleri`,
    description:
      locale === "en"
        ? `${name} category products`
        : `${name} kategorisindeki ürünler`,
    canonical: `/${locale}/${category}`,
    locale: locale,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { locale, category } = await params;

  const baseUrl = "https://www.epinpay.com";
  const categoryUrl = `${baseUrl}/${locale}/categories/${category}`;

  const res = await getCategory(new URLSearchParams(), category);

  const breadcrumbItems = [
    {
      name: "Home",
      url: `${baseUrl}/${locale}`,
    },
    {
      name: "Categories",
      url: `${baseUrl}/${locale}/categories`,
    },
    {
      name: category,
      url: categoryUrl,
    },
  ];

  return (
    <>
      {/* SEO Content */}
      <BreadcrumbSchema items={breadcrumbItems} />

      <CategorySchema
        name={category}
        description={`${category} kategorisindeki ürünler`}
        url={categoryUrl}
        locale={locale}
        items={[
          // TODO : şimdilik fetch yok bunlar placeholder
          { name: "Sample Item 1", url: `${categoryUrl}/item-1` },
          { name: "Sample Item 2", url: `${categoryUrl}/item-2` },
        ]}
      />

      {/* Page Content */}
      <CategoryClient
        breadcrumbItems={breadcrumbItems}
        initialProducts={res.data}
        initialFilters={res.filters}
        pagination={res.pagination}
      />
    </>
  );
}
