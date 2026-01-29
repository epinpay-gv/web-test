import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api',
          '/checkout',
          '/search',
          '/account',
          '/products',
          '/categories/',
          '/user',
          '/store',
          '/cdn-cgi',
        ],
      },
    ],
    sitemap: [
      'https://www.epinpay.com/sitemaps/sitemap.xml',
      'https://www.epinpay.com/sitemaps/en/sitemap.xml',
    ],
  }
}
