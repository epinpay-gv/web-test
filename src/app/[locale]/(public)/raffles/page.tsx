import {
  CollectionPageSchema,
  FaqSchema,
  OrganizationSchema,
  WebsiteSchema,
} from "@/components/seo";
import { getRaffles } from "@/features/raffles/raffles.service";
import { createSeo } from "@/lib/seo";
import RafflesClientPage from "./raffles-client";
import StatusState from "@/components/common/StatusState/StatusState";

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ locale: string }>;
// }) {
//   const { locale } = await params;

//   const res = await getRaffles();

//   return createSeo({
//     title: res.metadata.title,
//     description: res.metadata.metaDescription,
//     canonical: `/${locale}/raffles`,
//     locale: locale,
//   });
// }

export default async function RafflesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/raffles`;

  // const res = await getRaffles();

  //SEO ITEMS
  // const seoCollectionItems = res.data.sliders.map((raffle) => ({
  //   kind: "raffle" as const,
  //   "@type": "ListItem",
  //   name: raffle.raffles[0].title,
  //   eventStatus: "https://schema.org/EventScheduled",
  //   eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  //   description: raffle.raffles[0].description ?? "",
  //   image: raffle.raffles[0].rewards?.[0].image ?? "",
  //   startDate: raffle.raffles[0].startDate,
  //   endDate: raffle.raffles[0].endDate,
  //   organizer: {
  //     "@type": "Organization",
  //     "@id": "https://www.epinpay.com/#organization",
  //     name: "Epinpay",
  //   },
  // }));

  return (
    <>
      {/* SEO Content */}
      {/* <OrganizationSchema locale={locale} description={res.metadata.title} />
      <WebsiteSchema locale={locale} description={res.metadata.title} />
      <CollectionPageSchema
        pageUrl={pageUrl}
        name={res.metadata.metaTitle}
        description={res.metadata.metaDescription}
        locale={locale}
        numberOfItems={res.data.sliders[0].raffles.length}
        items={seoCollectionItems}
      />
      <FaqSchema pageUrl={pageUrl} faqData={res.data.faq || []} /> */}

      {/* Page Content */}

      <div className="py-40">
        <StatusState
          image="/illustrations/woman-laptop-chatting-dark.svg"
          title={"Yapım Aşamasında"}
          description={
            "Bu sayfa yapım aşamasında! Kısa süre sonra tekrar gelin."
          }
        />
      </div>
      {/* <RafflesClientPage data={res.data} isLoading={false} /> */}
    </>
  );
}
