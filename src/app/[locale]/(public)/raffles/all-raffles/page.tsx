import { OrganizationSchema, WebsiteSchema } from "@/components/seo";
import { getAllRaffles, getRaffles } from "@/features/raffles/server";
import { createSeo } from "@/lib/seo";
import AllRafflesClient from "./all-raffles-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const res = await getAllRaffles();

  return createSeo({
    title: res.metadata.title,
    description: res.metadata.metaDescription,
    canonical: `/${locale}/raffles/all-raffles`,
    locale: locale,
  });
}

export default async function AllRafflesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const res = await getAllRaffles();

  return (
    <>
      {/* SEO Content */}
      <OrganizationSchema locale={locale} description={res.metadata.title} />
      <WebsiteSchema locale={locale} description={res.metadata.title} />

      {/* Page Content */}
      <AllRafflesClient
        initialRaffles={res.data}
        initialFilters={res.filters}
        pagination={res.pagination}
        breadcrumbItems={[]}
      />
    </>
  );
}
