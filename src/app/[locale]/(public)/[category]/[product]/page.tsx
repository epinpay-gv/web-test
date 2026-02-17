import { createSeo } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/seo";

type Params = {
  locale: string;
  category: string;
};

type Props = {
  params: Promise<Params>;
  searchParams: Promise<{ productType?: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, category } = await params;
  const name = category.replace(/-/g, " ");

  return createSeo({
    title: locale === "en" ? `${name} Products` : `${name} Ürünleri`,
    description:
      locale === "en"
        ? `${name} category products`
        : `${name} kategorisindeki ürünler`,
    canonical: `/${locale}/${category}`,
    locale: locale,
  });
}

export default async function ProductPage({ params, searchParams }: Props) {
  const { locale, category } = await params;
  const { productType } = await searchParams;

  const categoryUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/${category}`;


  

  return (
    <>
      {/* SEO Content */}
      {/* <BreadcrumbSchema items={breadcrumbItems} />
      <ProductSchema
        name={category}
        description={`${category} kategorisindeki ürünler`}
        url={categoryUrl}
        locale={locale}
        items={res.data.map((item) => ({
          name: item.translation.name,
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/${categoryUrl}/${item.translation.slug}`,
        }))}
      /> */}

      {/* Page Content */}

    </>
  );
}
