import type { MetadataRoute } from 'next'

const SITE_URL = 'https://www.epinpay.com'
const LOCALES = ['tr', 'en']

/**
TODO : datayı apiden çek
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',              // homepage
    '/categories',
    '/about',
    '/blog',
    '/premium',
    '/epstore',
    '/mini-games',
    '/raffles',
    '/streamers',
  ]

  const now = new Date()

  return LOCALES.flatMap((locale) =>
    routes.map((route) => ({
      url:
        locale === 'tr'
          ? `${SITE_URL}${route}`
          : `${SITE_URL}/${locale}${route}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: route === '' ? 1 : 0.8,
    }))
  )
}
