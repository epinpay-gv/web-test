import { OrganizationSchema, WebsiteSchema } from "@/components/seo";
import { getRaffles } from "@/features/raffles/service";
import { createSeo } from "@/lib/seo";
import RafflesClientPage from "./raffles-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const res = await getRaffles();

  return createSeo({
    title: res.metadata.title,
    description: res.metadata.metaDescription,
    canonical: `/${locale}/raffles`,
    locale: locale,
  });
}

export default async function RafflesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const res = await getRaffles();

  return (
    <>
      {/* SEO Content */}
      <OrganizationSchema locale={locale} description={res.metadata.title} />
      <WebsiteSchema locale={locale} description={res.metadata.title} />

      {/* Page Content */}
      <RafflesClientPage data={res.data} isLoading={false} />
    </>
  );
}
