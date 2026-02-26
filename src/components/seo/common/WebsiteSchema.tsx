type WebsiteSchemaProps = {
  baseUrl: string
  locale: string
  description: string
}

export function WebsiteSchema({
  baseUrl,
  locale,
  description,
}: WebsiteSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'Epinpay',
    alternateName: 'Epinpay',
    description, // locale’a göre anasayfa meta title’ı
    url: `${baseUrl}/`,
    inLanguage: locale,
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  )
}