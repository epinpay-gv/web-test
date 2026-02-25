import { BreadcrumbItem } from "@/types/types"

type BreadcrumbSchemaProps = {
  baseUrl: string
  locale: string
  items: BreadcrumbItem[]
}

export function BreadcrumbSchema({
  baseUrl,
  locale,
  items,
}: BreadcrumbSchemaProps) {
  const absoluteBase = `${baseUrl}/${locale}`

  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${absoluteBase}${item.href}`,
  }))

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${absoluteBase}${items[items.length - 1].href}#breadcrumb`,
    itemListElement,
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