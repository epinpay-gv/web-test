import type { Metadata } from 'next'

type CreateSeoParams = {
  title: string
  description: string
  canonical: string
  locale: string
  image?: string
}

const SITE_URL = 'https://www.epinpay.com'
const SUPPORTED_LOCALES = ['tr', 'en']

export function createSeo({
  title,
  description,
  canonical,
  locale,
  image,
}: CreateSeoParams): Metadata {
  const languages: Record<string, string> = {}

  SUPPORTED_LOCALES.forEach((l) => {
    languages[l] = `${SITE_URL}/${l}${canonical}`
  })

  return {
    title,
    description,

    alternates: {
      canonical: `${SITE_URL}${canonical}`,
      languages,
    },

    openGraph: {
      title,
      description,
      url: `${SITE_URL}${canonical}`,
      images: image ? [{ url: image }] : undefined,
    },

    twitter: {
      card: 'summary_large_image',
      images: image ? [image] : undefined,
    },
  }
}
