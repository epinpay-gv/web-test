import OrdersClient from "./orders-client";
import UserPageHeader from "@/features/user/components/common/UserPageHeader";
import { createSeo } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return createSeo({
    title: "Siparişlerim | Epinpay",
    description: "Siparişlerinizi yönetin",
    canonical: `/${locale}/user/orders`,
    locale: locale,
  });
}

export default function OrdersPage() {
  return (
    <div>
      <UserPageHeader title="Siparişlerim" />
      <OrdersClient />
    </div>
  );
}
