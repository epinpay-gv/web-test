import { createSeo } from "@/lib/seo";
import {
  BreadcrumbSchema,
  CollectionPageSchema,
  FaqSchema,
  ItemListSchema,
  OrganizationSchema,
  WebsiteSchema,
} from "@/components/seo";
import { getCategory } from "@/features/catalog/service";
import CategoryClient from "./category-client";
import {
  createCategoryBreadcrumb,
  extractSelectedFilterOption,
} from "@/features/catalog/utils";
import { Suspense } from "react";

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
  const res = await getCategory(new URLSearchParams(), category);

  return createSeo({
    title: res.category.translation.metaTitle,
    description: res.category.translation.metaDescription,
    canonical: `/${locale}/${category}`,
    locale: res.category.translation.locale,
  });
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { locale, category } = await params;
  const { productType } = await searchParams;

  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/${category}`;
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
