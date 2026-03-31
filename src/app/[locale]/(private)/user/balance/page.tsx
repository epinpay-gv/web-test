import UserPageHeader from "@/features/user/components/UserPageHeader";
import { createSeo } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return createSeo({
    title: "Bakiye İşlemleri | Epinpay",
    description: "Bakiyenizi yönetin",
    canonical: `/${locale}/user/balance`,
    locale: locale,
  });
}

export default async function BalancePage() {
//   const res = await getOrders(search);

  return (
    <div>
      <UserPageHeader title="Bakiye İşlemleri" />
    </div>
  );
}
