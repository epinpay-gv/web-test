import { createSeo } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/seo/common/BreadcrumbSchema";
import ProductsClient from "./products-client";
import { getProducts } from "@/features/catalog/service";
import {
  createProductsBreadcrumb,
  extractSelectedFilterOption,
} from "@/features/catalog/utils";
import { OrganizationSchema, WebsiteSchema } from "@/components/seo";

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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.epinpay.com";

  const res = await getProducts(new URLSearchParams());
  const metadata = res.metadata.find((m) => m.pageId === 1) || {
    title: "Ürünler",
    metaDescription: "Epinpay ürünlerini keşfedin",
  };
  const productsMetadata = res.metadata.find((m) => m.pageId === 2) || {
    title: "Ürünler",
    metaDescription: "Epinpay ürünlerini keşfedin",
  };

  // BREADCRUMB DATA
  const selectedProductType = extractSelectedFilterOption(
    res.data.filters,
    "productType",
    productType,
  );

  const breadcrumbItems = createProductsBreadcrumb(locale, selectedProductType);

  return (
    <>
      {/* SEO Content */}
      <OrganizationSchema
        baseUrl={baseUrl}
        locale={locale}
        description={metadata.title}
      />
      <WebsiteSchema
        baseUrl={baseUrl}
        locale={locale}
        description={metadata.title}
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Page Content */}
      <ProductsClient
        initialProducts={res.data.data}
        initialFilters={res.data.filters}
        pagination={res.data.pagination}
        breadcrumbItems={breadcrumbItems}
      />
    </>
  );
}
