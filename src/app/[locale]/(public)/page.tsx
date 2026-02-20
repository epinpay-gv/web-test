import { createSeo } from "@/lib/seo";
import { getMainPageData } from "@/features/mainpage/service";
import PromotedSection from "@/features/mainpage/promoted/components/PromotedSection";
import { MainPageSchema } from "@/components/seo";
import { MegaMenu } from "@/components/common";
import BestSellers from "@/features/mainpage/bestsellers/components/BestSellers";
import Campaigns from "@/features/mainpage/components/Campaings";
import MasterMenu from "@/features/mainpage/components/MasterMenu";
import PremiumSection from "@/features/mainpage/premium/components/PremiumSection";

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

  const megaMock = {
    mainLinks: [
      {
        icon: "",
        title: "Cüzdan Kodları ve Hediye Kartları",
        description: "Cüzdan kodları ve hediye kartlarını anında satın alın.",
        url: "/products?productType=2",
      },

      {
        icon: "",
        title: "Konsol ve Abonelik Hizmetleri",
        description:
          "Konsol üyelikleri ve abonelik paketlerine kolayca erişin.",
        url: "/products?productType=4",
      },

      {
        icon: "",
        title: "Yazılım ve Lisanslar",
        description:
          "Orijinal yazılım lisanslarını hızlı teslimat avantajıyla edinin.",
        url: "/products?productType=1",
      },
      {
        icon: "",
        title: "Oyun Pinleri",
        description:
          "Kodlarla hesabınızı hızlı ve güvenli şekilde güçlendirin.",
        url: "/products?productType=3",
      },
    ],
    productinks: [
      { name: "Valorant", url: "" },
      { name: "LOL", url: "" },
      { name: "CS:GO", url: "" },
      { name: "Pubg Mobile", url: "" },
      { name: "Pubg Mobile 1", url: "" },
      { name: "Pubg Mobile 2", url: "" },
      { name: "Pubg Mobile 3", url: "" },
    ],
  };

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
      {/* <PromotedSection promoted={res.promoted} /> */}
        <MasterMenu />
        <BestSellers />
        <PremiumSection />
    </>
  );
}
