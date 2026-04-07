type LegalPageSchemaProps = {
  locale: string;
  pageUrl: string;
  name: string;
  description: string;
  updated_at: string;
};

type schemaData = {
  "@context": string;
  "@type": string;
  "@id": string;
  url: string;
  name: string;
  description: string;
  inLanguage: string;
  isPartOf: {
    "@type": string;
    "@id": string;
  };
  publisher: {
    "@id": string;
  };
  dateModified: string;
};

export function LegalPageSchema({
  locale,
  pageUrl,
  name,
  description,
  updated_at,
}: LegalPageSchemaProps) {
  const schema: schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}/kvkk#webpage`,
    url: pageUrl,
    name,
    description,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://www.epinpay.com/#website",
    },
    publisher: {
      "@id": "https://www.epinpay.com/#organization",
    },
    dateModified: updated_at,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
