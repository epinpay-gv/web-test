import { createSeo } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import {
  FilterNavBar,
  PageTitle,
  FilterContainer,
  ProductGrid,
} from "@/features/catalog/components/components";
import { ProductsSchema } from "@/components/seo/ProductsSchema";
import { mockProducts, filterGroups } from "@/mocks";
import { FilterGroupConfig } from "@/features/catalog/components/filters/Filters/types";
import ProductsClient from "./products-client";
import { getProducts } from "@/features/catalog/service";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return createSeo({
    title: params.locale === "en" ? "All Products" : "Tüm Ürünler",
    description:
      params.locale === "en" ? "Browse all products" : "Tüm ürünleri keşfedin",
    canonical: "/products",
    locale: params.locale,
  });
}

export default async function ProductsPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
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
