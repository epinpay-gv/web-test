import Script from 'next/script'

type MainPageSchemaProps = {
  name: string
  description?: string
  url: string
  locale: string
  items?: {
    name: string
    url: string
  }[]
}

export function MainPageSchema({
  name,
  description,
  url,
  locale,
}: MainPageSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MainPage',
    name,
    description,
    url,
    inLanguage: locale,
  }

  return (
    <Script
      id={`mainpage-schema-${name}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
