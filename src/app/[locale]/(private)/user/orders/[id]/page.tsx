import OrderDetailClient from "./order-detail-client";
import UserPageHeader from "@/features/user/components/common/UserPageHeader";
import { createSeo } from "@/lib/seo";

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

export async function generateMetadata({ params }: Props) {
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

  return (
    <>
      <div className="hidden md:block">
        <UserPageHeader title="Siparişlerim" />
      </div>
      <div className="block md:hidden"></div>
      <OrderDetailClient id={id} />
    </>
  );
}
