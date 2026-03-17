import { OrganizationSchema, WebsiteSchema } from "@/components/seo";
import { getStreamers } from "@/features/streamers/streamers.service";
import { createSeo } from "@/lib/seo";
import StreamersClientPage from "./streamers-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const res = await getStreamers();

  return createSeo({
    title: res.metadata.title,
    description: res.metadata.metaDescription,
    canonical: `/${locale}/raffles`,
    locale: locale,
  });
}

export default async function StreamersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const res = await getStreamers();
  return (
    <>
      {/* SEO Content */}
      <OrganizationSchema locale={locale} description={res.metadata.title} />
      <WebsiteSchema locale={locale} description={res.metadata.title} />

      {/* Page Content */}
      {/* <StreamersClientPage data={res.data} isLoading={false} /> */}
    </>
  );
}
