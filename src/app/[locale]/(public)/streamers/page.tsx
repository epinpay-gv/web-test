import { OrganizationSchema, WebsiteSchema } from "@/components/seo";
import { getStreamers } from "@/features/streamers/streamers.service";
import { createSeo } from "@/lib/seo";
import {
  MainBannerSection,
  FormBanner,
  PlatformSection,
} from "@/features/streamers/components";
import dynamic from "next/dynamic";
const EpinpayStreamers = dynamic(
  () =>
    import("@/features/streamers/components/EpinpayStreamers/EpinpayStreamers"),
  {
    loading: () => (
      <div className="w-full h-60 animate-pulse bg-white/5 rounded-2xl" />
    ),
  },
);
const StreamerPackages = dynamic(
  () =>
    import("@/features/streamers/components/StreamerPackages/StreamerPackages"),
  {
    loading: () => (
      <div className="w-full h-96 animate-pulse bg-white/5 rounded-2xl" />
    ),
  },
);
const ApplicationSteps = dynamic(
  () =>
    import("@/features/streamers/components/ApplicationSteps/ApplicationSteps"),
  {
    loading: () => (
      <div className="w-full h-40 animate-pulse bg-white/5 rounded-2xl" />
    ),
  },
);
const FAQSection = dynamic(
  () => import("@/features/streamers/components/FAQSection/FAQSection"),
  {
    loading: () => (
      <div className="w-full h-60 animate-pulse bg-white/5 rounded-2xl" />
    ),
  },
);

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
      <div className="bg-(--bg-neutral-tertiary)">
        <div className="flex flex-col items-center md:gap-10 pb-10">
          {/* MAIN BANNER */}
          <MainBannerSection data={res.data.mainBanner} />

          {/* PLATFORMS */}
          <PlatformSection data={res.data.streams} />

          {/* FORM BANNER */}
          <FormBanner />

          {/* EPINPAY STREAMERS */}
          <EpinpayStreamers data={res.data.epinpayStreamer} />

          {/* STREAMER PACKAGES */}
          <StreamerPackages data={res.data.packages} />

          {/* HOW TO */}
          <ApplicationSteps />

          {/* FAQ */}
          <FAQSection data={res.data.faq} />
        </div>
      </div>
    </>
  );
}
