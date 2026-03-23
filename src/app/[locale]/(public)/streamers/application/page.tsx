import { OrganizationSchema, WebsiteSchema } from "@/components/seo";
import { getStreamers } from "@/features/streamers/streamers.service";
import { createSeo } from "@/lib/seo";
import StreamerApplicationClientPage from "./streamer-application-client";

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

export default async function StreamerApplicationPage({
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
      <StreamerApplicationClientPage data={res.data} isLoading={false} />
    </>
  );
}
