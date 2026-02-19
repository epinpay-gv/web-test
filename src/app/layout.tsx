import type { Metadata } from 'next'
import Script from 'next/script'
import { ThemeProvider } from '@/features/theme/components/ThemeProvider';
import '@/styles/global.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.epinpay.com'),
  title: {
    default: 'Epinpay',
    template: '%s | Epinpay',
  },
  description: 'Güvenli ve hızlı alışverişin tek adresi',
  robots: { index: true, follow: true },
  referrer: 'no-referrer-when-downgrade',
  openGraph: {
    type: 'website',
    siteName: 'Epinpay',
    title: 'Epinpay',
    description: 'Güvenli ve hızlı alışverişin tek adresi',
    images: [{ url: 'https://cdn.epinpay.com/image/ep/logo/white/horizontal.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://cdn.epinpay.com/image/ep/logo/white/horizontal.webp'],
  },
}

export const viewport = { themeColor: '#2a2b2c' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* --- ORİJİNAL SCRİPTLERİN (Bozmadan Geri Getirildi) --- */}
        {/* <Script
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

        <Script
          id="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Epinpay',
              url: 'https://www.epinpay.com',
              logo: 'https://cdn.epinpay.com/image/ep/logo/white/horizontal.webp',
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

        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Epinpay',
              url: 'https://www.epinpay.com',
            }),
          }}
        /> */}

        {/* <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WKCNWN7N"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript> */}
        {/* --- SCRİPTLER SONU --- */}

        <ThemeProvider>
            <main className="min-h-screen">
              {children}
            </main>
        </ThemeProvider>
      </body>
    </html>
  )
}