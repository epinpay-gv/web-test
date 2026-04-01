import { DescriptionTitle } from "@/components/common";
import { BalanceBox, BalanceHistoryData } from "@/features/user/components";
import UserPageHeader from "@/features/user/components/common/UserPageHeader";
import { getBalance } from "@/features/user/user.service";
import { createSeo } from "@/lib/seo";

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

export default async function BalancePage() {
  const res = await getBalance();
  console.log(res);
  return (
    <div>
      <UserPageHeader title="Bakiye İşlemleri" />
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-8">
          {/* LOAD BALANCE */}
          <div className="flex flex-col gap-2">
            <DescriptionTitle
              title="Bakiye yükle"
              description="Yüklemek istediğiniz tutarı girerek veya seçerek belirleyiniz."
            />
            <BalanceBox />
          </div>

         {/* BALANCE HISTORY */}
          <div className="flex flex-col gap-2">
            <DescriptionTitle
              title="Bakiye yükleme geçmişi"
              description="Geçmiş yüklemelerini buradan kontrol edebilirsiniz."
            />
            <div className="space-y-2">
              {res.data.map((item) => (
                <BalanceHistoryData key={item.id} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
