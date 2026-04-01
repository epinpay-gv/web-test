import UserPageHeader from "@/features/user/components/common/UserPageHeader";
import { getRaffleById } from "@/features/user/user.service";
import { createSeo } from "@/lib/seo";
import { notFound } from "next/navigation";
import RaffleDetailClient from "./raffle-detail-client";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string, id: string }>;
}) {
  const { locale, id } = await params;

  return createSeo({
    title: "Çekiliş Detay | Epinpay",
    description: "Çekiliş detaylarınızı görüntüleyin",
    canonical: `/${locale}/user/raffles/${id}`,
    locale: locale,
  });
}

export default async function RafflePage({ params }: Props) {
  const { id } = await params;
  const res = await getRaffleById(id);

  if (!res?.data) notFound(); 

  return (
    <div>
      <UserPageHeader title="Siparişlerim" />
      <RaffleDetailClient data={res.data} />
    </div>
  );
}
