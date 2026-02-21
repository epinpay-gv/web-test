import { createSeo } from "@/lib/seo";
import { getMainPageData } from "@/features/mainpage/service";
import { MainPageSchema } from "@/components/seo";
import { BestSellersSection, PromotedSection, PremiumSection } from "@/features/mainpage/components";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return createSeo({
    title: locale === "en" ? "Epinpay" : "Epinpay",
    description: locale === "en" ? "Epinpay" : "Epinpay",
    canonical: "/",
    locale: locale,
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = "https://www.epinpay.com";

  const res = await getMainPageData();

  return (
    <>
      {/* SEO Content */}
      <MainPageSchema
        name="Epinpay"
        description="Epinpay"
        url={`${baseUrl}/${locale}/`}
        locale={locale}
      />
      {/* Page Content */}
      <PromotedSection data={res.promoted} />
      <BestSellersSection data={res.bestsellers} />
      <PremiumSection data={res.premium} />
    </>
  );
}
