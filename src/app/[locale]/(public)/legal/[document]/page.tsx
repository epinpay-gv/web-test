import { getLegalDocument } from "@/features/legal/legal.service";
import { notFound } from "next/navigation";
import { LegalDocumentType } from "@/features/legal/types";
import { BreadcrumbSchema, LegalPageSchema, OrganizationSchema, WebsiteSchema } from "@/components/seo";
import { Breadcrumb } from "@/components/common";
import { createAboutBreadcrumb } from "@/lib/createBreadcrumb";
import { Home } from "flowbite-react-icons/outline";

export default async function LegalDetailPage({
  params,
}: {
  params: Promise<{ locale: string; document: LegalDocumentType }>;
}) {
  const { locale, document } = await params;
  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/legal/${document}`;

  const res = await getLegalDocument(document);
  if (!res) return notFound();

  // BREADCRUMB DATA
  const breadcrumbItems = createAboutBreadcrumb(locale);

  return (
    <>
      {/* SEO Content */}
      <OrganizationSchema locale={locale} description={res.metadata.title} />
      <WebsiteSchema locale={locale} description={res.metadata.title} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <LegalPageSchema
        locale={locale}
        pageUrl={pageUrl}
        name={res.metadata.title}
        description={res.metadata.metaDescription}
        updated_at={res.data.updatedAt ?? ""}
      />

      {/* Page Content */}
      <div className="max-w-5xl mx-auto ">
        <Breadcrumb
          items={breadcrumbItems.map((item, index) => ({
            ...item,
            icon: index === 0 ? <Home size={14} /> : undefined,
          }))}
        />
        <div className="space-y-10 flex flex-col py-12 px-4">
          <h1 className="text-xl font-semibold ">{res.data.title}</h1>
          {res.data.blocks.map((block) => (
            <div key={block.id} className="w-full max-w-3xl">
              {block.title && (
                <h2 className="font-semibold py-4 text-(--text-heading)">
                  {block.title}
                </h2>
              )}

              <div className="w-full p-6 rounded-xl border border-(--border-default) bg-(--bg-neutral-primary-soft)">
                <p className="text-sm text-(--text-body) leading-relaxed">
                  {block.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
