import { createSeo } from "@/lib/seo";
import { getMainPageData } from "@/features/mainpage/mainpage.service";
import {
  BestSellersSection,
  PromotedSection,
  PremiumSection,
  StreamerRafflesSection,
  EpinpayRafflesSection,
  EpinpayStreamersSection,
  StreamerBannerSection,
  EpinpayCardsSection,
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
      {res.data.promoted && <PromotedSection data={res.data.promoted} />}
      {res.data.bestsellers && (
        <BestSellersSection data={res.data.bestsellers} />
      )}
      {/* {res.data.streamerRaffles && (
        <StreamerRafflesSection data={res.data.streamerRaffles} />
      )} */}
      {/* {res.data.epinpayRaffles && (
        <EpinpayRafflesSection data={res.data.epinpayRaffles} />
      )} */}
      <EpinpayCardsSection />
      {/* {res.data.epinpayStreamers && (
        <EpinpayStreamersSection data={res.data.epinpayStreamers} />
      )} */}
      {/* {res.data.bestsellers && (
        <BestSellersSection data={res.data.bestsellers} />
      )} */}
      <StreamerBannerSection />
      {/* <PremiumSection data={res.data.premium} /> */}
    </>
  );
}
