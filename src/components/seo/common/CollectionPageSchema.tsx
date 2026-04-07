type CollectionPageSchemaProps = {
  pageUrl: string;
  name: string;
  description: string;
  locale: string;
  numberOfItems: number;
  items: (ItemListElementCatalog | ItemListElementRaffle)[];
};

type ItemListElementCatalog = {
  kind: "catalog";
  "@type": string;
  position: number;
  item: string; //url
};

type ItemListElementRaffle = {
  kind: "raffle";
  "@type": string;
  name: string;
  eventStatus: string;
  eventAttendanceMode: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  organizer: {
    "@type": string;
    "@id": string;
    name: string;
  };
};

type MappedCatalogItem = {
  "@type": "ListItem";
  position: number;
  item: string;
};

type MappedRaffleItem = {
  "@type": "Event";
  position: number;
  name: string;
  eventStatus: string;
  eventAttendanceMode: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  organizer: {
    "@type": string;
    "@id": string;
    name: string;
  };
};

type MappedItem = MappedRaffleItem | MappedCatalogItem;

type MainEntity = {
  "@type": string;
  "@id": string;
  itemListOrder: string;
  numberOfItems: number;
  itemListElement: MappedItem[];
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
  mainEntity: MainEntity;
};


function isCatalogItem(
  item: ItemListElementCatalog | ItemListElementRaffle,
): item is ItemListElementCatalog {
  return item.kind === "catalog";
}

function isRaffleItem(
  item: ItemListElementCatalog | ItemListElementRaffle,
): item is ItemListElementRaffle {
  return item.kind === "raffle";
}

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
  schema.mainEntity.itemListElement = items.map((r, index): MappedItem => {
    if (isCatalogItem(r)) {
      return {
        "@type": "ListItem",
        position: index + 1, // schema.org positions are 1-based
        item: r.item,
      };
    }

    return {
      "@type": "Event",
      position: index + 1,
      name: r.name,
      eventStatus: r.eventStatus,
      eventAttendanceMode: r.eventAttendanceMode,
      description: r.description,
      image: r.image,
      startDate: r.startDate,
      endDate: r.endDate,
      organizer: r.organizer,
    };
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
