import { Metadata } from 'next'

const SITE_URL = 'https://www.epinpay.com'

type SeoParams = {
  title: string
  description?: string
  path: string
  locale: 'tr' | 'en'
  image?: string
  noIndex?: boolean
}

export function createSeo({
  title,
  description,
  path,
  locale,
  image,
  noIndex,
}: SeoParams): Metadata {
  const url = `${SITE_URL}/${locale}${path}`

  return {
    title,
    description,
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    alternates: {
      canonical: url,
      languages: {
        tr: `${SITE_URL}/tr${path}`,
        en: `${SITE_URL}/en${path}`,
        'x-default': `${SITE_URL}${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  }
}
