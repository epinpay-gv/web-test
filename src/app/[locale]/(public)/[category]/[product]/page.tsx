import { createSeo } from "@/lib/seo";
import { BreadcrumbSchema, OrganizationSchema, ProductSchema, WebsiteSchema } from "@/components/seo";
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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.epinpay.com";

  const res = await getProduct(new URLSearchParams(), category, product);

  const breadcrumbItems = createProductBreadcrumb(
    locale,
    res.data.category.categoryData.translation.name,
    category,
    res.data.data.translation.name,
    product,
  );

  return (
    <>
      {/* SEO Content */}
      <OrganizationSchema
        baseUrl={baseUrl}
        locale={locale}
        description={res.metadata?.title || ""}
      />
      <WebsiteSchema
        baseUrl={baseUrl}
        locale={locale}
        description={res.metadata?.title || ""}
      />
      <BreadcrumbSchema
        items={breadcrumbItems}
        baseUrl={productUrl}
        locale={locale}
      />
      <ProductSchema
        baseUrl={baseUrl}
        locale={locale}
        slug={res.data.data.translation.slug}
        name={res.data.data.translation.metaTitle}
        description={res.data.data.translation.metaDescription}
        image={[`${res.data.data.translation.imgUrl}`]}
        sku={res.data.data.translation.name}
        category={res.data.category.categoryData.translation.name}
        price={res.data.data.basePrice || 0}
        currency={""} // ! bu nereden gelecek sonra bakılmalı
        stock={0} // ! bu backend typeına eklenecek
        priceValidUntil={""} // ! buna ne eklenmeli?
      />

      {/* Page Content */}
      <ProductClient
        breadcrumbItems={breadcrumbItems}
        initialProduct={res.data.data}
        initialCategory={res.data.category}
      />
    </>
  );
}
