import { createSeo } from "@/lib/seo";
import { getMainPageData } from "@/features/mainpage/service";
import {
  BestSellersSection,
  PromotedSection,
  PremiumSection,
} from "@/features/mainpage/components";
import { OrganizationSchema, WebsiteSchema } from "@/components/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const res = await getMainPageData();

  return createSeo({
    title: res.metadata.title,
    description: res.metadata.metaDescription,
    canonical: `/${locale}`,
    locale: locale,
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const res = await getMainPageData();

  return (
    <>
      {/* SEO Content */}
      <OrganizationSchema description={res.metadata.title} locale={locale} />
      <WebsiteSchema description={res.metadata.title} locale={locale} />

      {/* Page Content */}
      <PromotedSection data={res.data.promoted} />
      <BestSellersSection data={res.data.bestsellers} />
      <PremiumSection data={res.data.premium} />
    </>
  );
}
