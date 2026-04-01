import OrdersClient from "./orders-client";
import UserPageHeader from "@/features/user/components/common/UserPageHeader";
import { getOrders } from "@/features/user/user.service";
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

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const search = await searchParams;
  const res = await getOrders(search);

  return (
    <div>
      <UserPageHeader title="Siparişlerim" />
      <OrdersClient
        data={res.data}
        pagination={res.pagination}
        initialFilters={res.filters}
      />
    </div>
  );
}
