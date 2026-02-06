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
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = "https://www.epinpay.com";

 const res = await getProducts(new URLSearchParams());

  return (
    <>
      {/* SEO Content */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Products", url: `${baseUrl}/${locale}/products` },
        ]}
      />
      <ProductsSchema
        name="Epinpay Products"
        description="Epinpay ürünleri"
        url={`${baseUrl}/${locale}/products`}
        locale={locale}
      />

      {/* Page Content */}
      <ProductsClient
        initialProducts={res.data}
        initialFilters={res.filters}
        // total={res.pagination.count}
        total={2000}
      />
    </>
  );
}
