import { Metadata } from 'next'
import { createSeo } from '@/lib/seo'
import Script from 'next/script'

type Props = {
  params: {
    locale: 'tr' | 'en'
    category: string
  }
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale, category } = params

  // normalde API’den gelir
  const categoryName =
    category === 'steam' ? 'Steam' : category

  return createSeo({
    title:
      locale === 'tr'
        ? `${categoryName} Epin Satın Al`
        : `Buy ${categoryName} Gift Cards`,
    description:
      locale === 'tr'
        ? `${categoryName} epinlerini güvenle ve anında satın al.`
        : `Buy ${categoryName} gift cards instantly and securely.`,
    path: `/${category}`,
    locale,
  })
}


export default function CategoryPage() {
  const products = [
    {
      name: 'Steam 100 TL',
      url: 'https://www.epinpay.com/tr/steam/100-tl',
    },
    {
      name: 'Steam 200 TL',
      url: 'https://www.epinpay.com/tr/steam/200-tl',
    },
  ]

  return (
    <>
      <Script
        id="category-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Steam Epin',
            hasPart: {
              '@type': 'ItemList',
              itemListElement: products.map((p, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: p.name,
                url: p.url,
              })),
            },
          }),
        }}
      />

      <div>{/* UI */}</div>
    </>
  )
}
