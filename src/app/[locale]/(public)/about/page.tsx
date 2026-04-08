import { Breadcrumb } from "@/components/common";
import {
  OrganizationSchema,
  WebsiteSchema,
  BreadcrumbSchema,
} from "@/components/seo";
import { getAboutPage } from "@/features/legal/legal.service";
import { createAboutBreadcrumb } from "@/lib/createBreadcrumb";
import { createSeo } from "@/lib/seo";
import { Home } from "flowbite-react-icons/outline";
import { notFound } from "next/navigation";

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

  const res = await getAboutPage();
  if (!res) return notFound();

  // BREADCRUMB DATA
  const breadcrumbItems = createAboutBreadcrumb(locale);

  return (
    <>
      {/* SEO Content */}
      <OrganizationSchema locale={locale} description={res.metadata.title} />
      <WebsiteSchema locale={locale} description={res.metadata.title} />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Page Content */}
      <div className="max-w-5xl mx-auto">
        <Breadcrumb
          items={breadcrumbItems.map((item, index) => ({
            ...item,
            icon: index === 0 ? <Home size={14} /> : undefined,
          }))}
        />
        <div dangerouslySetInnerHTML={{ __html: res.data }} />
      </div>
    </>
  );
}
