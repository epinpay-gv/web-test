import { createSeo } from "@/lib/seo";
import { BreadcrumbSchema, ProductSchema } from "@/components/seo";
import ProductClient from "./product-client";
import { getProduct } from "@/features/catalog/service";

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
      locale === "en"
        ? `${name} product detailı`
        : `${name} ürün detayı`,
    canonical: `/${locale}/${category}`,
    locale: locale,
  });
}

export default async function ProductPage({ params }: Props) {
  const { locale, category, product } = await params;

  const productUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/${category}/${product}`;
  const categoryUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/${category}`;

  const res = await getProduct(new URLSearchParams(), category, product);

  const breadcrumbItems = [
    {
      name: "Anasayfa",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}`,
    },
    {
      name: "Kategoriler",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/categories`,
    },
    {
      name: "",
      url: categoryUrl,
    },
    {
      name: res.data.translation.name,
      url: productUrl,
    },
  ];

  return (
    <>
      {/* SEO Content */}
      <BreadcrumbSchema items={breadcrumbItems} />
      <ProductSchema
        name={category}
        description={product}
        url={productUrl}
        locale={locale}
      />

      {/* Page Content */}
      <ProductClient
        breadcrumbItems={breadcrumbItems}
        initialProduct={res.data}
        initialCategory={res.category}
      />
    </>
  );
}
