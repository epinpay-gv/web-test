import { createSeo } from "@/lib/seo";
import {
  BreadcrumbSchema,
  FaqSchema,
  OrganizationSchema,
  ProductSchema,
  WebsiteSchema,
} from "@/components/seo";
import ProductClient from "./product-client";
import { getProduct } from "@/features/catalog/service";
import { createProductBreadcrumb } from "@/features/catalog/utils";
import { Suspense } from "react";

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

  const res = await getProduct("", category, product);

  return createSeo({
    title: res.data.translation.metaTitle,
    description: res.data.translation.metaDescription,
    canonical: `/${locale}/${category}/${product}`,
    locale,
  });
}

export default async function ProductPage({ params }: Props) {
  const { locale, category, product } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.epinpay.com";
  const pageUrl = `${baseUrl}/${locale}/${category}/${product}`;

  const res = await getProduct("", category, product);

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
      <OrganizationSchema locale={locale} description={res.metadata.title} />
      <WebsiteSchema locale={locale} description={res.metadata?.title} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <ProductSchema
        pageUrl={pageUrl}
        name={res.data.translation.metaTitle}
        description={res.data.translation.metaDescription}
        image={[`${res.data.translation.imgUrl}`]}
        sku={res.data.translation.name}
        category={res.category.categoryData.translation.name}
        price={res.data.basePrice || 0}
        currency={"TRY"} // TODO : bu nereden gelecek sonra bakılmalı
        stock={res.data.totalStock || 0}
      />
      <FaqSchema pageUrl={pageUrl} faqData={res.data.translation.faq || []} />

      {/* Page Content */}
      <Suspense fallback={null}>
        <ProductClient
          breadcrumbItems={breadcrumbItems}
          initialProduct={res.data}
          initialCategory={res.category}
        />
      </Suspense>
    </>
  );
}
