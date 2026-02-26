import { mockOrders } from "@/mocks/user/orders.mock";
import OrderDetailClient from "./order-detail-client";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;
  
  const order = mockOrders.find((o) => o.id === id);
  
  if (!order) notFound();

  return <OrderDetailClient order={order} />;
}