import type { Metadata } from 'next'

const SITE_URL = 'https://www.epinpay.com'
const SUPPORTED_LOCALES = ['tr', 'en']

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const safeLocale = SUPPORTED_LOCALES.includes(locale)
    ? locale
    : 'tr'

  const alternates: Record<string, string> = {}

  SUPPORTED_LOCALES.forEach((l) => {
    alternates[l] = `${SITE_URL}/${l}`
  })

  return {
    alternates: {
      languages: alternates,
    },
  }
}


export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  await params
  return <>{children}</>
}
