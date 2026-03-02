import OrdersClient from "./orders-client";
import UserPageHeader from "@/features/user/components/UserPageHeader";
import { getOrders } from "@/features/user/service";

interface OrdersPageProps {
  params: Promise<{ locale: string }>;
}

export default async function OrdersPage({}: OrdersPageProps) {
  const params = new URLSearchParams();
  params.set("page", "1");
  params.set("perPage", "10");

  const res = await getOrders(params);

  return (
    <div>
      <UserPageHeader title="Siparişlerim" />
      <OrdersClient data={res.data} pagination={res.pagination} />
    </div>
  );
}