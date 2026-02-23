import { createSeo } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ProductsSchema } from "@/components/seo/ProductsSchema";
import ProductsClient from "./products-client";
import { getProducts } from "@/features/catalog/service";
import {
  createProductsBreadcrumb,
  extractSelectedFilterOption,
} from "@/features/catalog/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return createSeo({
    title: locale === "en" ? "All Products" : "Tüm Ürünler",
    description:
      locale === "en" ? "Browse all products" : "Tüm ürünleri keşfedin",
    canonical: "/products",
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

  const res = await getProducts(new URLSearchParams());

  // BREADCRUMB DATA
  const selectedProductType = extractSelectedFilterOption(
    res.filters,
    "productType",
    productType,
  );

  const breadcrumbItems = createProductsBreadcrumb(locale, selectedProductType);

  return (
    <>
      {/* SEO Content */}
      <BreadcrumbSchema items={breadcrumbItems} />
      <ProductsSchema
        name="Epinpay Products"
        description="Epinpay ürünleri"
        url={`${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/products`}
        locale={locale}
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
