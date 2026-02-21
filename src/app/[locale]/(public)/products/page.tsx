import { createSeo } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ProductsSchema } from "@/components/seo/ProductsSchema";
import ProductsClient from "./products-client";
import { getProducts } from "@/features/catalog/service";

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
    { name: "Anasayfa", url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}` },
    {
      name: "Ürünler",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/products`,
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
