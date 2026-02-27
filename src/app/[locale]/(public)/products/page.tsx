import { createSeo } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/seo/common/BreadcrumbSchema";
import ProductsClient from "./products-client";
import { getProducts } from "@/features/catalog/service";
import {
  createProductsBreadcrumb,
  extractSelectedFilterOption,
} from "@/features/catalog/utils";
import {
  CollectionPageSchema,
  FaqSchema,
  ItemListSchema,
  OrganizationSchema,
  WebsiteSchema,
} from "@/components/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const res = await getProducts(new URLSearchParams());
  const metadata = res.metadata.find((m) => m.pageId === 2) || {
    title: "Ürünler",
    metaDescription: "Epinpay ürünlerini keşfedin",
  };

  return createSeo({
    title: metadata.title,
    description: metadata.metaDescription,
    canonical: `/${locale}/products`,
    locale: locale,
  });
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ productType?: string }>;
}) {
  const { locale } = await params;
  const { productType } = await searchParams;

  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/products`;

  const res = await getProducts(new URLSearchParams());
  const metadata = res.metadata.find((m) => m.pageId === 1) || {
    title: "Ürünler",
    metaDescription: "Epinpay ürünlerini keşfedin",
  };

  // BREADCRUMB DATA
  const selectedProductType = extractSelectedFilterOption(
    res.filters,
    "productType",
    productType,
  );

  const breadcrumbItems = createProductsBreadcrumb(locale, selectedProductType);

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
      <OrganizationSchema locale={locale} description={metadata.title} />
      <WebsiteSchema locale={locale} description={metadata.title} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <CollectionPageSchema
        pageUrl={pageUrl}
        name={metadata.title}
        description={metadata.metaDescription}
        locale={locale}
        numberOfItems={4}
        items={seoCollectionItems}
      />
      <ItemListSchema
        pageUrl={pageUrl}
        name={metadata.title}
        numberOfItems={0}
        items={seoListItems}
      />

      {/* Page Content */}
      <ProductsClient
        initialProducts={res.data}
        initialFilters={res.filters}
        pagination={res.pagination}
        breadcrumbItems={breadcrumbItems}
      />
    </>
  );
}
