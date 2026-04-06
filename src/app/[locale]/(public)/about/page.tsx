import {
  OrganizationSchema,
  WebsiteSchema,
  BreadcrumbSchema,
} from "@/components/seo";
import { createAboutBreadcrumb } from "@/lib/createBreadcrumb";
import { createSeo } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return createSeo({
    title: "Hakkımızda",
    description: "Hakkımızda description",
    canonical: `/${locale}/about`,
    locale: locale,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/about`;

  // BREADCRUMB DATA
  const breadcrumbItems = createAboutBread
  crumb(locale);

  return (
    <>
      {/* SEO Content */}
      <OrganizationSchema locale={locale} description={res.metadata.title} />
      <WebsiteSchema locale={locale} description={res.metadata.title} />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Page Content */}
    </>
  );
}
