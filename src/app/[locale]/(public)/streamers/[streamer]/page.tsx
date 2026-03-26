import StreamerClientPage from "./streamer-client";

export default async function StreamerPage({
  params,
}: {
  params: Promise<{ locale: string; streamer: string }>;
}) {
  const { locale, streamer } = await params;

  return (
    <>
      {/* SEO Content */}
      {/* <OrganizationSchema locale={locale} description={res.metadata.title} /> */}
      {/* <WebsiteSchema locale={locale} description={res.metadata.title} /> */}

      {/* Page Content */}
      <StreamerClientPage isLoading={false} />
    </>
  );
}
