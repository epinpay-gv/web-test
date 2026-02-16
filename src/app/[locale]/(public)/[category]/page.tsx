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
  searchParams: Promise<{ productType?: string }>;
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

export default async function CategoryPage({ params, searchParams }: Props) {
  const { locale, category } = await params;
  const { productType } = await searchParams;

  const categoryUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/categories/${category}`;

  const res = await getCategory(new URLSearchParams(), category);

  const productTypeGroup = res.filters.find(
    (group) => group.elements?.[0]?.key === "productType",
  );

  let productTypeOptions: { label: string; value: string }[] = [];

  const element = productTypeGroup?.elements.find(
    (el) => el.key === "productType",
  );

  if (element && element.type === "checkbox") {
    productTypeOptions = element.options;
  }

  const selectedProductType = productTypeOptions.find(
    (opt) => opt.value === productType,
  );

  const breadcrumbItems = [
    {
      name: "Home",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}`,
    },
    {
      name: "Categories",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/categories`,
    },
    {
      name: category,
      url: categoryUrl,
    },
  ];

  if (selectedProductType) {
    breadcrumbItems.push({
      name: selectedProductType.label,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/products?productType=${productType}`,
    });
  }

  return (
    <>
      {/* SEO Content */}
      <BreadcrumbSchema items={breadcrumbItems} />
      <CategorySchema
        name={category}
        description={`${category} kategorisindeki ürünler`}
        url={categoryUrl}
        locale={locale}
        items={res.data.map((item) => ({
          name: item.translation.name,
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/${categoryUrl}/${item.translation.slug}`,
        }))}
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
