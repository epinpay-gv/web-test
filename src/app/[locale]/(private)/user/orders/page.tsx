import OrdersClient from "./orders-client";
import UserPageHeader from "@/features/user/components/UserPageHeader";
import { getOrders } from "@/features/user/service";
import { resolveStatusParams, OrderStatusTab } from "@/features/user/user.types";

interface OrdersPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    date?: string;
  }>;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const { page, search, status, date } = await searchParams;

  const tab = (status ?? "ALL") as OrderStatusTab;
  const statusValues = resolveStatusParams(tab);

  const params = new URLSearchParams();
  params.set("page", page ?? "1");
  params.set("perPage", "10");
  if (search?.trim()) params.set("search", search.trim());
  if (date) params.set("date", date);
  // Backend hazır olunca: tek bir status yerine birden fazla gönderilebilir
  // Şimdilik birden fazla varsa hepsini ayrı parametre olarak ekle
  statusValues.forEach((s) => params.append("status", s));

  const res = await getOrders(params);

  // Kullanıcının hiç siparişi var mı? (filtreden bağımsız kontrol)
  const isFiltered = !!(search?.trim() || date || tab !== "ALL");
  let hasAnyOrders = res.data.length > 0;
  if (isFiltered && res.data.length === 0) {
    const baseParams = new URLSearchParams({ page: "1", perPage: "1" });
    const baseRes = await getOrders(baseParams);
    hasAnyOrders = baseRes.data.length > 0;
  }

  return (
    <div>
      <UserPageHeader title="Siparişlerim" />
      <OrdersClient
        data={res.data}
        pagination={res.pagination}
        hasAnyOrders={hasAnyOrders}
      />
    </div>
  );
}