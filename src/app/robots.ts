export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
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
      {
        userAgent: '*',
        allow: ['/categories'],
      },
    ],
    sitemap: [
      'https://www.epinpay.com/sitemaps/sitemap.xml',
      'https://www.epinpay.com/sitemaps/en/sitemap.xml',
    ],
  }
}
