import { createSeo } from "@/lib/seo";
import {
  BreadcrumbSchema,
  CollectionPageSchema,
  FaqSchema,
  ItemListSchema,
  OrganizationSchema,
  WebsiteSchema,
} from "@/components/seo";
import { getCategory } from "@/features/catalog/catalog.service";
import CategoryClient from "./category-client";
import { Suspense } from "react";
import { extractSelectedFilterOption } from "@/features/filters/utils/filters.utils";
import { notFound } from "next/navigation";
import { createCategoryBreadcrumb } from "@/lib/createBreadcrumb";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; category: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale, category } = await params;
  const search = await searchParams;

  try {
    const res = await getCategory(search, category);
    if (!res?.category?.translation) notFound();

    return createSeo({
      title: res.category?.translation?.metaTitle,
      description: res.category?.translation?.metaDescription,
      canonical: `/${locale}/${category}`,
      locale: res.category?.translation?.locale,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.status === 404) notFound();
    throw error;
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; category: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale, category } = await params;
  const search = await searchParams;

  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/${category}`;

  let res;
  try {
    res = await getCategory(search, category);
    if (!res?.category?.translation) notFound();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.status === 404) notFound();
    throw error;
  }

  // BREADCRUMB DATA
  const typeValue = Array.isArray(search.type) ? search.type[0] : search.type;

  const selectedProductType = extractSelectedFilterOption(
    res.filters,
    "productType",
    typeValue,
  );

  const breadcrumbItems = createCategoryBreadcrumb(
    locale,
    res.category?.translation?.name,
    category,
    selectedProductType,
  );

  //SEO ITEMS
  const seoCollectionItems = res.data.slice(0, 4).map((product, index) => ({
    kind: "catalog" as const,
    "@type": "ListItem",
    position: index + 1,
    item: `${pageUrl}/${product.translation.slug}`,
  }));

  const seoListItems = res.data.slice(0, 4).map((product, index) => ({
    "@type": "ListItem",
    position: index,
    url: `${pageUrl}`,
    item: {
      "@type": "Product",
      "@id": `${pageUrl}#product`,
      name: product.translation.name,
      url: `${pageUrl}/${product.translation.slug}`,
      image: [`${product.translation.imgUrl}`],
      category: product.translation.category_slug, // TODO : buraya category adı gelmeli
      brand: {
        "@type": "Brand",
        name: product.translation.category_slug, // TODO : buraya category adı gelmeli
      },
    },
    offers: {
      "@type": "Offer",
      "@id": `${pageUrl}#offer`,
      url: `${pageUrl}`,
      price: product.basePrice || 0,
      priceCurrency: "", // TODO : bu eklenecek
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        "@id": "https://www.epinpay.com/#organization",
        name: "Epinpay",
        url: "https://www.epinpay.com/",
      },
    },
  }));

  return (
    <>
      {/* SEO Content */}
      <OrganizationSchema locale={locale} description={res.metadata.title} />
      <WebsiteSchema locale={locale} description={res.metadata?.title} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <CollectionPageSchema
        pageUrl={pageUrl}
        name={res.category?.translation?.metaTitle}
        description={res.category?.translation?.metaDescription}
        locale={locale}
        numberOfItems={4}
        items={seoCollectionItems}
      />
      <ItemListSchema
        pageUrl={pageUrl}
        name={res.category?.translation?.metaTitle}
        numberOfItems={0}
        items={seoListItems}
      />
      <FaqSchema
        pageUrl={pageUrl}
        faqData={res.category?.translation?.faq || []}
      />

      {/* Page Content */}
      <Suspense fallback={null}>
        <CategoryClient
          breadcrumbItems={breadcrumbItems}
          initialProducts={res.data}
          initialFilters={res.filters}
          pagination={res.pagination}
          initialCategory={res.category}
          categorySlug={category}
        />
      </Suspense>
    </>
  );
}
