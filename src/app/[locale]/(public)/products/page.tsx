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

export default function ProductsPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const baseUrl = "https://www.epinpay.com";

  const filterData: FilterGroupConfig = {
    titleData: {
      title: "",
    },
    elements: [],
  };

  const titleData = {
    title: "Filtrele",
    isUnderlined: true,
  };

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
      <div className="container max-w-7xl mx-auto pb-12">
        <FilterNavBar data={filterData} />
        <PageTitle
          data={{
            title: "Tüm ürünler ",
            totalProductAmount: 2173,
          }}
          changeOrder={function (order: string): void {
            throw new Error("Function not implemented.");
          }}
        />
        <div className="flex gap-4">
          <FilterContainer titleData={titleData} groups={filterGroups} />
          <ProductGrid data={mockProducts} />
        </div>
      </div>
    </>
  );
}
