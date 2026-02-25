import { createSeo } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/seo";
import ProductClient from "./product-client";
import { getProduct } from "@/features/catalog/service";
import { createProductBreadcrumb } from "@/features/catalog/utils";

type Params = {
  locale: string;
  category: string;
  product: string;
};

type Props = {
  params: Promise<Params>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, category, product } = await params;
  const name = product.replace(/-/g, " ");

  return createSeo({
    title: locale === "en" ? `${name} Products` : `${name}`,
    description:
      locale === "en" ? `${name} product detailı` : `${name} ürün detayı`,
    canonical: `/${locale}/${category}`,
    locale: locale,
  });
}

export default async function ProductPage({ params }: Props) {
  const { locale, category, product } = await params;

  const productUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/${category}/${product}`;

  const res = await getProduct(new URLSearchParams(), category, product);

  const breadcrumbItems = createProductBreadcrumb(
    locale,
    res.category.categoryData.translation.name,
    category,
    res.data.translation.name,
    product,
  );

  return (
    <>
      {/* SEO Content */}
      <BreadcrumbSchema items={breadcrumbItems} baseUrl={""} locale={""} />


      {/* Page Content */}
      <ProductClient
        breadcrumbItems={breadcrumbItems}
        initialProduct={res.data}
        initialCategory={res.category}
      />
    </>
  );
}
