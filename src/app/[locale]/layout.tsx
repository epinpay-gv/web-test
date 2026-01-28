import type { Metadata } from 'next'

const SITE_URL = 'https://www.epinpay.com'
const SUPPORTED_LOCALES = ['tr', 'en']

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const locale = SUPPORTED_LOCALES.includes(params.locale)
    ? params.locale
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

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={params.locale}>
      <body>{children}</body>
    </html>
  )
}
