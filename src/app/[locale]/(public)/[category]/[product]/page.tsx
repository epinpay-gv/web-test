import { createSeo } from "@/lib/seo";
import {
  BreadcrumbSchema,
  FaqSchema,
  OrganizationSchema,
  ProductSchema,
  WebsiteSchema,
} from "@/components/seo";
import { getProduct } from "@/features/catalog/catalog.service";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { createProductBreadcrumb } from "@/lib/createBreadcrumb";
import { Breadcrumb } from "@/components/common";
import {
  ProductInfo,
  SeoSectionWithTab,
  BasketSection,
} from "@/features/catalog/components";
import { Home } from "flowbite-react-icons/outline";

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

  try {
    const res = await getProduct("", category, product);

    if (!res?.data?.translation) notFound();

    return createSeo({
      title: res.data.translation.metaTitle,
      description: res.data.translation.metaDescription,
      canonical: `/${locale}/${category}/${product}`,
      locale,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.status === 404) notFound();
    throw error;
  }
}

export default async function ProductPage({ params }: Props) {
  const { locale, category, product } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.epinpay.com";
  const pageUrl = `${baseUrl}/${locale}/${category}/${product}`;

  let res;
  try {
    res = await getProduct("", category, product);
    if (!res?.data?.translation) notFound();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.status === 404) notFound();
    throw error;
  }

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
        <div className="container max-w-5xl mx-auto pb-12 py-6 space-y-4 px-4 md:px-0">
          <Breadcrumb
            items={breadcrumbItems.map((item, index) => ({
              ...item,
              icon: index === 0 ? <Home size={14} /> : undefined,
            }))}
          />
          <div className="flex md:flex-row flex-col gap-4">
            <div className="flex flex-col gap-10 flex-1 min-w-0">
              <ProductInfo
                data={res.data}
                variants={res.category.variants.map((p) => ({
                  slug: p.translation.slug,
                  name: p.translation.name,
                }))}
                regions={res.category.regions}
                platforms={res.category.platforms}
              />
              <SeoSectionWithTab
                initialCategory={res.category.categoryData}
                initialProduct={res.data}
              />
            </div>
            <div className="hidden md:block">
              <BasketSection data={res.data} />
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}
