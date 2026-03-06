import OrdersClient from "./orders-client";
import UserPageHeader from "@/features/user/components/UserPageHeader";
import { getOrders } from "@/features/user/service";
import { resolveStatusParams, OrderStatusTab } from "@/features/user/user.types";

interface OrdersPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  }>;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const { page, search, status, dateFrom, dateTo } = await searchParams;

  const tab = (status ?? "ALL") as OrderStatusTab;
  const statusValues = resolveStatusParams(tab);

  const params = new URLSearchParams();
  params.set("page", page ?? "1");
  params.set("perPage", "10");
  if (search?.trim()) params.set("search", search.trim());
  if (dateFrom) params.set("dateFrom", dateFrom);
  if (dateTo) params.set("dateTo", dateTo);
  statusValues.forEach((s) => params.append("status", s));

  const res = await getOrders(params);

  const isFiltered = !!(search?.trim() || dateFrom || dateTo || tab !== "ALL");
  let hasAnyOrders = res.data.length > 0;

  if (isFiltered && !hasAnyOrders) {
    const baseRes = await getOrders(new URLSearchParams({ page: "1", perPage: "1" }));
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