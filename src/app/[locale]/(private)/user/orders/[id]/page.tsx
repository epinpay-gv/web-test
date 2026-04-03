import { getOrderById } from "@/features/user/user.service";
import OrderDetailClient from "./order-detail-client";
import { notFound } from "next/navigation";
import UserPageHeader from "@/features/user/components/common/UserPageHeader";
import { createSeo } from "@/lib/seo";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;

  return createSeo({
    title: "Sipariş Detay | Epinpay",
    description: "Sipariş detaylarınızı görüntüleyin",
    canonical: `/${locale}/user/orders/${id}`,
    locale: locale,
  });
}

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;
  const res = await getOrderById(id);

  if (!res?.data) notFound();

  return (
    <>
      <div className="hidden md:block">
        <UserPageHeader title="Siparişlerim" />
      </div>
      <div className="block md:hidden"></div>
      <OrderDetailClient order={res.data} />
    </>
  );
}
