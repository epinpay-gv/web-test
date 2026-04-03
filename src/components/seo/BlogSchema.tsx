type BlogSchemaProps = {
  locale: string;
  pageUrl: string;
  headline: string;
  description: string;
  image: string;
};

type schemaData = {
  "@context": string;
  "@type": string;
  "@id": string;
  mainEntityOfPage: {
    "@type": string;
    "@id": string;
  };
  headline: string;
  description: string;
  image: string[];
  author: {
    "@type": string;
    name: string;
    url: string;
  };
  publisher: {
    "@type": string;
    name: string;
    logo: {
      "@type": string;
      url: string;
    };
  };
  datePublished: string;
  dateModified: string;
  inLanguage: string;
};

export function BlogSchema({
  locale,
  pageUrl,
  headline,
  description,
  image,
}: BlogSchemaProps) {
  const schema: schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${pageUrl}#blogposting`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${pageUrl}`,
    },
    headline,
    description,
    image: [`${image}`],
    author: {
      "@type": "Organization",
      name: "Epinpay",
      url: "https://www.epinpay.com/",
    },
    publisher: {
      "@type": "Organization",
      name: "Epinpay",
      logo: {
        "@type": "ImageObject",
        url: "https://cdn.epinpay.com/logo/epinpay-logo.png", // TODO : bunun props olarak gelmesi lazım
      },
    },
    datePublished: "2026-01-10",
    dateModified: "2026-01-20",
    inLanguage: locale,
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
