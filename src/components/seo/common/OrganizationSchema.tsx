// "use client";
type OrganizationSchemaProps = {
  locale: string;
  description: string;
};

export function OrganizationSchema({
  locale,
  description,
}: OrganizationSchemaProps) {
  const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "Epinpay",
    url: `${baseUrl}/`,
    description, // locale’a göre anasayfa meta title’ı
    email: "contact@epinpay.com",
    logo: {
      "@type": "ImageObject",
      url: "https://cdn.epinpay.com/image/ep/logo/white/horizontal.webp?width=300",
      width: 196,
      height: 40,
    },
    sameAs: [
      "https://www.tiktok.com/@epinpaycom",
      "https://www.instagram.com/epinpayofficial",
      "https://www.youtube.com/@epinpay",
      "https://x.com/epinpay",
      "https://tr.pinterest.com/epinpay/",
      "https://www.facebook.com/people/Epinpayofficial/61575728233059/",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "contact@epinpay.com",
        availableLanguage: ["tr", "en"],
      },
    ],
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      "@id": `${baseUrl}/${locale}/legal/return-policy#policy`,
      returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
    },
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
      }}
    />
  );
}

// export function OrganizationSchema({ baseUrl, locale, description }: OrganizationSchemaProps) {
//   const schema = {
//     '@context': 'https://schema.org',
//     '@type': 'Organization',
//     '@id': `${baseUrl}/#organization`,
//     name: 'Epinpay',
//     url: `${baseUrl}/`,
//     description,
//     email: 'contact@epinpay.com',
//     logo: {
//       '@type': 'ImageObject',
//       url: 'https://cdn.epinpay.com/image/ep/logo/white/horizontal.webp?width=300',
//       width: 196,
//       height: 40,
//     },
//     sameAs: [
//       'https://www.tiktok.com/@epinpaycom',
//       'https://www.instagram.com/epinpayofficial',
//       'https://www.youtube.com/@epinpay',
//       'https://x.com/epinpay',
//       'https://tr.pinterest.com/epinpay/',
//       'https://www.facebook.com/people/Epinpayofficial/61575728233059/',
//     ],
//     contactPoint: [{
//       '@type': 'ContactPoint',
//       contactType: 'customer support',
//       email: 'contact@epinpay.com',
//       availableLanguage: ['tr', 'en'],
//     }],
//     hasMerchantReturnPolicy: {
//       '@type': 'MerchantReturnPolicy',
//       '@id': `${baseUrl}/${locale}/legal/return-policy#policy`,
//       returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
//     },
//   }

//   return (
//     <script
//       type="application/ld+json"
//       suppressHydrationWarning
//       dangerouslySetInnerHTML={{
//         __html: typeof window === 'undefined'
//           ? JSON.stringify(schema).replace(/</g, '\\u003c')
//           : ' ',
//       }}
//     />
//   )
// }
