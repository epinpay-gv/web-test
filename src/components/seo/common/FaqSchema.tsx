type FaqSchemaProps = {
  pageUrl: string;
  faqData: { id: number; name: string; description: string }[];
};

type schemaData = {
  "@context": string;
  "@type": string;
  "@id": string;
  mainEntity?: {
    "@type": string;
    name: string;
    acceptedAnswer: {
      "@type": string;
      text: string;
    };
  }[];
};

export function FaqSchema({
  pageUrl,
  faqData,
}: FaqSchemaProps) {

  const schema: schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "Teslimat ne kadar sürer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dijital teslimat genellikle birkaç dakika içinde tamamlanır.",
        },
      },
      {
        "@type": "Question",
        name: "Bu ürün hangi bölgede kullanılabilir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bu ürün Türkiye bölgesi için geçerlidir.",
        },
      },
      {
        "@type": "Question",
        name: "İade var mı?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dijital ürünlerde teslimat sonrası iade mümkün değildir.",
        },
      },
    ],
  };

  if (faqData?.length) {
    schema.mainEntity = faqData.map((r) => ({
      "@type": "Question",
      name: r.name,
      acceptedAnswer: {
        "@type": "Answer",
        text: r.description,
      },
    }));
  }

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
