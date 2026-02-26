import { createSeo } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/seo";
import { getCategory } from "@/features/catalog/service";
import CategoryClient from "./category-client";
import {
  createCategoryBreadcrumb,
  extractSelectedFilterOption,
} from "@/features/catalog/utils";

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

  const categoryUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/${category}`;
  const res = await getCategory(new URLSearchParams(), category);

  const selectedProductType = extractSelectedFilterOption(
    res.filters,
    "productType",
    productType,
  );

  const breadcrumbItems = createCategoryBreadcrumb(
    locale,
    res.category?.translation?.name,
    category,
    selectedProductType,
  );

  return (
    <>
      {/* SEO Content */}
      {/* <BreadcrumbSchema items={breadcrumbItems} /> */}

      {/* Page Content */}
      <CategoryClient
        breadcrumbItems={breadcrumbItems}
        initialProducts={res.data}
        initialFilters={res.filters}
        pagination={res.pagination}
        initialCategory={res.category}
        categorySlug={category}
      />
    </>
  );
}
