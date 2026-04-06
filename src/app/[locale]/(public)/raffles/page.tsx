import { CollectionPageSchema, OrganizationSchema, WebsiteSchema } from "@/components/seo";
import { getRaffles } from "@/features/raffles/raffles.service";
import { createSeo } from "@/lib/seo";
import RafflesClientPage from "./raffles-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const res = await getRaffles();

  return createSeo({
    title: res.metadata.title,
    description: res.metadata.metaDescription,
    canonical: `/${locale}/raffles`,
    locale: locale,
  });
}

export default async function RafflesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/raffles`;

  const res = await getRaffles();

  //SEO ITEMS
  const seoCollectionItems = res.data.sliders.slice(0, 4).map((raffle, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: `${pageUrl}/${raffle}`,
  }));

  const seoListItems = res.data.sliders.slice(0, 4).map((raffle, index) => ({
    "@type": "ListItem",
    position: index,
    url: `${pageUrl}`,
    item: {
      "@type": "Product",
      "@id": `${pageUrl}#product`,
      name: product.translation.name,
      url: product.translation.slug,
      image: [`${product.translation.imgUrl}`],
      category: product.translation.category_slug, // TODO : buraya category adı gelmeli
      brand: {
        "@type": "Brand",
        name: product.translation.category_slug, // TODO : buraya category adı gelmeli
      },
    },
    offers: {
      "@type": "Offer",
      "@id": `${pageUrl}#offer`,
      url: `${pageUrl}`,
      price: product.basePrice || 0,
      priceCurrency: "", // TODO : bu eklenecek
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        "@id": "https://www.epinpay.com/#organization",
        name: "Epinpay",
        url: "https://www.epinpay.com/",
      },
    },
  }));

  return (
    <>
      {/* SEO Content */}
      <OrganizationSchema locale={locale} description={res.metadata.title} />
      <WebsiteSchema locale={locale} description={res.metadata.title} />
      <CollectionPageSchema
        pageUrl={pageUrl}
        name={res.metadata.metaTitle}
        description={res.metadata.metaDescription}
        locale={locale}
        numberOfItems={4}
        items={seoListItems}
      />

      {/* Page Content */}
      <RafflesClientPage data={res.data} isLoading={false} />
    </>
  );
}
