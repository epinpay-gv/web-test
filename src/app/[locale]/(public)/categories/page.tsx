import { createSeo } from '@/lib/seo'
import { Metadata } from 'next'
import Script from 'next/script'

type Props = {
  params: { locale: 'tr' | 'en' }
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const isTr = params.locale === 'tr'

  return createSeo({
    title: isTr ? 'Kategoriler' : 'Categories',
    description: isTr
      ? 'Epinpay üzerindeki tüm oyun ve ürün kategorilerini keşfet.'
      : 'Explore all game and product categories on Epinpay.',
    path: '/categories',
    locale: params.locale,
  })
}

export default function CategoriesPage() {
 const categories = [
    { slug: 'steam', name: 'Steam' },
    { slug: 'valorant', name: 'Valorant' },
  ]

  return (
    <>
      <Script
        id="categories-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: categories.map((cat, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: cat.name,
              url: `https://www.epinpay.com/tr/${cat.slug}`,
            })),
          }),
        }}
      />

      <div>
        
      </div>
    </>
  )
}
