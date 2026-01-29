import Script from 'next/script'

type CategorySchemaProps = {
  name: string
  description?: string
  url: string
  locale: string
  items?: {
    name: string
    url: string
  }[]
}

export function CategorySchema({
  name,
  description,
  url,
  locale,
  items = [],
}: CategorySchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    inLanguage: locale,
    mainEntity: items.length
      ? {
          '@type': 'ItemList',
          itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            url: item.url,
          })),
        }
      : undefined,
  }

  return (
    <Script
      id={`category-schema-${name}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
