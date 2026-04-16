import { DescriptionTitle } from "@/components/common";
import BalanceBox from "@/features/user/components/balance/BalanceBox";
import UserPageHeader from "@/features/user/components/common/UserPageHeader";
import { createSeo } from "@/lib/seo";
import BalanceClient from "./balance-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return createSeo({
    title: "Bakiye İşlemleri",
    description: "Bakiyenizi yönetin",
    canonical: `/${locale}/user/balance`,
    locale: locale,
  });
}

export default function BalancePage() {
  return (
    <div>
      <UserPageHeader title="Bakiye İşlemleri" />
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-8">
          <div className="flex flex-col gap-2">
            <DescriptionTitle
              title="Bakiye yükle"
              description="Yüklemek istediğiniz tutarı girerek veya seçerek belirleyiniz."
            />
            <BalanceBox />
          </div>
          <div className="flex flex-col gap-2">
            <DescriptionTitle
              title="Bakiye yükleme geçmişi"
              description="Geçmiş yüklemelerini buradan kontrol edebilirsiniz."
            />
            <BalanceClient />
          </div>
        </div>
      </div>
    </div>
  );
}
