import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import { generateOrganizationSchema } from "@/lib/seo";
import Script from "next/script";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    ),
    title: {
      default: process.env.NEXT_PUBLIC_APP_NAME || "E-Commerce App",
      template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME || "E-Commerce App"}`,
    },
    description:
      "Your one-stop shop for amazing products. Shop online with confidence.",
    keywords: ["ecommerce", "shopping", "online store", "products"],
    authors: [{ name: process.env.NEXT_PUBLIC_APP_NAME || "E-Commerce App" }],
    creator: process.env.NEXT_PUBLIC_APP_NAME || "E-Commerce App",
    publisher: process.env.NEXT_PUBLIC_APP_NAME || "E-Commerce App",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      siteName: process.env.NEXT_PUBLIC_APP_NAME || "E-Commerce App",
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Organization schema for the entire site
  const organizationSchema = generateOrganizationSchema([
    // Add your social media links here
    // "https://www.instagram.com/yourcompany",
    // "https://www.facebook.com/yourcompany",
    // "https://twitter.com/yourcompany",
  ]);

  return (
    <NextIntlClientProvider locale={locale}>
      {/* Organization JSON-LD Schema */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      {children}
    </NextIntlClientProvider>
  );
}