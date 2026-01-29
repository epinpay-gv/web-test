import { createSeo } from "@/lib/seo";
import { CategorySchema } from "@/components/seo/CategorySchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

type Props = {
  params: {
    locale: string
    category: string
  }
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; category: string };
}) {
  const name = params.category.replace(/-/g, " ");

  return createSeo({
    title: params.locale === "en" ? `${name} Products` : `${name} Ürünleri`,
    description:
      params.locale === "en"
        ? `${name} category products`
        : `${name} kategorisindeki ürünler`,
    canonical: `/${params.category}`,
    locale: params.locale,
  });
}

export default function CategoryPage({ params }: Props) {
  const { locale, category } = params;
  const baseUrl = "https://www.epinpay.com";
  const categoryUrl = `${baseUrl}/${locale}/categories/${category}`;

  return (
    <>
      {/* SEO Content */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Categories", url: `${baseUrl}/${locale}/categories` },
          { name: category, url: categoryUrl },
        ]}
      />

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
      <div>
        <h1>category</h1>
      </div>
    </>
  );
}
