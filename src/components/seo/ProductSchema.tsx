import { Comment } from "@/types/types";

type ProductsSchemaProps = {
  baseUrl: string;
  locale: string;
  slug: string;
  name: string;
  description: string;
  image: string[];
  sku: string;
  category: string;
  price: number;
  currency: string;
  stock: number;
  priceValidUntil: string;
  ratingValue?: number;
  reviewCount?: number;

  bestRating?: number;
  worstRating?: number;
  reviews?: Comment[];
};

type schemaData = {
  "@context": string;
  "@type": string;
  "@id": string; //"https://www.epinpay.com/pubg-mobile-uc/pubg-mobile-60-uc-tr#product";
  name: string;
  image: string[];
  description: string;
  sku: string;
  category: string;

  aggregateRating?: {
    "@type": string;
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
    worstRating: number;
  };

  review?: {
    "@type": string;
    name: string;
    reviewBody: string;
    datePublished: string;
    author: {
      "@type": string;
      name: string;
    };
    reviewRating: {
      "@type": string;
      ratingValue: string;
    };
  }[];

  offers: {
    "@type": string;
    "@id": string;
    url: string;
    price: string;
    priceCurrency: string;
    priceValidUntil: string;
    availability: string;
    itemCondition: string;

    inventoryLevel: {
      "@type": string;
      value: number;
    };

    seller: {
      "@id": string;
    };

    hasMerchantReturnPolicy: {
      "@type": string;
      "@id": string;
      returnPolicyCategory: string;
    };
  };
};

export function ProductSchema({
  baseUrl,
  locale,
  slug,
  name,
  description,
  image,
  sku,
  category,
  price,
  currency,
  stock,
  priceValidUntil,
  ratingValue,
  reviewCount,
  reviews,
}: ProductsSchemaProps) {
  const productUrl = `${baseUrl}/${locale}${slug}`;

  const schema: schemaData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`, //"https://www.epinpay.com/pubg-mobile-uc/pubg-mobile-60-uc-tr#product";
    name,
    image,
    description,
    sku,
    category,
    offers: {
      "@type": "Offer",
      "@id": `${productUrl}#offer`,
      url: productUrl,
      price: price.toString(),
      priceCurrency: currency,
      priceValidUntil: priceValidUntil,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      inventoryLevel: {
        "@type": "QuantitativeValue",
        value: stock,
      },
      seller: {
        "@id": "https://www.epinpay.com/#organization",
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        "@id": "https://www.epinpay.com/about/return-policy#digital",
        returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
      },
    },
  };

  if (ratingValue && reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: ratingValue,
      reviewCount: reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  if (reviews?.length) {
    schema.review = reviews.map((r) => ({
      "@type": "Review",
      name: r.name,
      reviewBody: r.comment,
      datePublished: r.createdAt,
      author: {
        "@type": "Person",
        name: r.name + " " + r.surname,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rate.toString(),
      },
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
}
