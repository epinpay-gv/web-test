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
import { createCategoryBreadcrumb } from "@/features/catalog/utils";
import { Suspense } from "react";
import { extractSelectedFilterOption } from "@/features/filters/utils/filters.utils";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; category: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale, category } = await params;
  const search = await searchParams;

  const res = await getCategory(search, category);

  return createSeo({
    title: res.category.translation.metaTitle,
    description: res.category.translation.metaDescription,
    canonical: `/${locale}/${category}`,
    locale: res.category.translation.locale,
  });
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
  const res = await getCategory(search, category);

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
      url: product.translation.slug,
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
        name={res.category.translation.metaTitle}
        description={res.category.translation.metaDescription}
        locale={locale}
        numberOfItems={4}
        items={seoCollectionItems}
      />
      <ItemListSchema
        pageUrl={pageUrl}
        name={res.category.translation.metaTitle}
        numberOfItems={0}
        items={seoListItems}
      />
      <FaqSchema
        pageUrl={pageUrl}
        faqData={res.category.translation.faq || []}
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
