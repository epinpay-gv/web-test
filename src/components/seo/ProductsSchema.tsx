import Script from 'next/script'

type ProductsSchemaProps = {
  name: string
  description?: string
  url: string
  locale: string
}

export function ProductsSchema({
  name,
  description,
  url,
  locale,
}: ProductsSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    inLanguage: locale,

  }

  return (
    <Script
      id={`products-schema-${name}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
