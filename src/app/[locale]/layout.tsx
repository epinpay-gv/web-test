import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.epinpay.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const safeLocale = routing.locales.includes(locale as any) ? locale : "tr";

  // ! NOT : as-needed olduğu için TR prefix'siz gelecek (seo için)
  const alternates: Record<string, string> = {};
  routing.locales.forEach((l) => {
    alternates[l] = l === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${l}`;
  });

  return {
    alternates: {
      languages: {
        ...alternates,
        "x-default": SITE_URL, //! NOT : SEO için x-default
      },
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

  // ! NOT : Geçersiz locale → 404'e atacak
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages(); 
  
  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
