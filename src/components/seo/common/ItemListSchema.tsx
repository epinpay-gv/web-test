type ItemListSchemaProps = {
  pageUrl: string;
  name: string;
  numberOfItems: number;
  items: ListItem[];
};

type ListItem = {
  "@type": string;
  position: number;
  url: string;
  item: {
    "@type": string;
    "@id": string;
    name: string;
    url: string;
    image: string[];
    category: string;
    brand: {
      "@type": string;
      name: string;
    };
  };
  offers: {
    "@type": string;
    "@id": string;
    url: string;
    price: number;
    priceCurrency: string;
    availability: string;
    seller: {
      "@type": string;
      "@id": string;
      name: string;
      url: string;
    };
  };
};

type schemaData = {
  "@context": string;
  "@type": string;
  "@id": string;
  url: string;
  name: string;
  numberOfItems: number;
  itemListOrder: string;
  itemListElement: ListItem[];
};

export function ItemListSchema({
  pageUrl,
  name,
  numberOfItems,
  items,
}: ItemListSchemaProps) {
  const schema: schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#product-teasers`,
    url: `${pageUrl}`,
    name,
    numberOfItems,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: items.map((r, index) => ({
      "@type": "ListItem",
      position: index,
      url: `${pageUrl}`,
      item: {
        "@type": "Product",
        "@id": `${pageUrl}#product`,
        name: r.item.name,
        url: r.item.url,
        image: [`${r.item.url}`],
        category: r.item.category,
        brand: {
          "@type": "Brand",
          name: r.item.category,
        },
      },
      offers: {
        "@type": "Offer",
        "@id": `${pageUrl}#offer`,
        url: `${pageUrl}`,
        price: r.offers.price,
        priceCurrency: r.offers.priceCurrency,
        availability: r.offers.availability,
        seller: {
          "@type": "Organization",
          "@id": "https://www.epinpay.com/#organization",
          name: "Epinpay",
          url: "https://www.epinpay.com/"
        },
      },
    })),
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
