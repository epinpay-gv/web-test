type CollectionPageSchemaProps = {
  pageUrl: string;
  name: string;
  description: string;
  locale: string;
  numberOfItems: number;
  items: ItemListElement[];
};

type ItemListElement = {
  "@type": string;
  position: number;
  item: string; //url
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
    name: string;
    url: string;
  };
  mainEntity: {
    "@type": string;
    "@id": string;
    numberOfItems: number;
    itemListOrder: string;
    itemListElement: ItemListElement[];
  };
};

export function CollectionPageSchema({
  pageUrl,
  name,
  description,
  locale,
  numberOfItems,
  items,
}: CollectionPageSchemaProps) {
  const schema: schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#webpage`,
    url: `${pageUrl}`,
    name,
    description,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://www.epinpay.com/#website",
      name: "Epinpay",
      url: "https://www.epinpay.com/",
    },
    mainEntity: {
      "@type": "ItemList",
      "@id": `${pageUrl}#itemlist`,
      numberOfItems,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: [],
    },
  };

  schema.mainEntity.itemListElement = items.map((r, index) => ({
    "@type": "ListItem",
    position: index,
    item: r.item,
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
