import type { Metadata } from 'next'
import Script from 'next/script'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Epinpay',
    template: '%s | Epinpay',
  },
  description: 'Güvenli ve hızlı alışverişin tek adresi',
  robots: 'index, follow',
  themeColor: '#2a2b2c',
  referrer: 'no-referrer-when-downgrade',
  openGraph: {
    type: 'website',
    siteName: 'Epinpay',
    title: 'Epinpay',
    description: 'Güvenli ve hızlı alışverişin tek adresi',
    images: [
      {
        url: 'https://cdn.epinpay.com/image/ep/logo/white/horizontal.webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      'https://cdn.epinpay.com/image/ep/logo/white/horizontal.webp',
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        {/* Google Tag Manager */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WKCNWN7N');
            `,
          }}
        />

        {/* Organization Schema */}
        <Script
          id="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Epinpay',
              description: 'Güvenli, hızlı epin alış ve satışı.',
              url: 'https://www.epinpay.com',
              email: 'contact@epinpay.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://cdn.epinpay.com/image/ep/logo/white/horizontal.webp',
                width: 300,
                height: 300,
              },
              sameAs: [
                'https://www.tiktok.com/@epinpaycom',
                'https://www.instagram.com/epinpayofficial',
                'https://www.youtube.com/@epinpay',
                'https://x.com/epinpay',
                'https://tr.pinterest.com/epinpay/',
                'https://www.facebook.com/people/Epinpayofficial/61575728233059/',
              ],
            }),
          }}
        />

        {/* Website Schema */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Epinpay',
              alternateName: 'Epinpay',
              url: 'https://www.epinpay.com',
              description: 'Güvenli, hızlı epin alış ve satışı.',
            }),
          }}
        />

        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WKCNWN7N"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {children}
      </body>
    </html>
  )
}
