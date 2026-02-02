import { Product, PRODUCT_STATUS } from "@/types/types";

export const mockProducts:  Product[] = [
  {
    id: 1,
    category: "PUBG",
    region: "TR",
    platform: "MOBILE",
    type: "UC",

    status: PRODUCT_STATUS.ACTIVE,

    basePrice: 41,
    epPrice: 36.5,
    fakePrice: 41,
    discountRate: 11,

    translation: {
      id: 1,
      typeId: 1,
      locale: "tr",
      name: "PUBG Mobile 60 UC",
      slug: "pubg-mobile-60-uc-tr",
      description: "PUBG Mobile 60 UC Türkiye bölgesi için geçerlidir.",
      metaTitle: "PUBG Mobile 60 UC Satın Al",
      metaDescription:
        "PUBG Mobile 60 UC Türkiye için güvenli ve hızlı satın alma.",
      imgUrl:
        "https://cdn.epinpay.com/image/ep/2025/6/product/pubg-mobile-60-uc-tr-5.webp",
      imgAlt: "PUBG Mobile 60 UC (Türkiye)",
    },
    cheapestOffer: { id: 101 },
    offers: [],
  },

  {
    id: 2,
    category: "PUBG",
    region: "TR",
    platform: "MOBILE",
    type: "UC",

    status: PRODUCT_STATUS.ACTIVE,

    basePrice: 210,
    epPrice: 182.95,
    fakePrice: 210,
    discountRate: 13,

    translation: {
      id: 2,
      typeId: 2,
      locale: "tr",
      name: "PUBG Mobile 325 UC",
      slug: "pubg-mobile-325-uc-tr",
      description: "PUBG Mobile 325 UC Türkiye bölgesi için geçerlidir.",
      metaTitle: "PUBG Mobile 325 UC Satın Al",
      metaDescription:
        "PUBG Mobile 325 UC Türkiye için güvenli ve hızlı satın alma.",
      imgUrl:
        "https://cdn.epinpay.com/image/ep/2025/6/product/pubg-mobile-325-uc-tr-15.webp",
      imgAlt: "PUBG Mobile 325 UC (Türkiye)",
    },
    cheapestOffer: { id: 102 },
    offers: [],
  },

  {
    id: 3,
    category: "PUBG",
    region: "TR",
    platform: "MOBILE",
    type: "UC",

    status: PRODUCT_STATUS.ACTIVE,

    basePrice: 418,
    epPrice: 365.95,
    fakePrice: 418,
    discountRate: 12,

    translation: {
      id: 3,
      typeId: 3,
      locale: "tr",
      name: "PUBG Mobile 660 UC",
      slug: "pubg-mobile-660-uc-tr",
      description: "PUBG Mobile 660 UC Türkiye bölgesi için geçerlidir.",
      metaTitle: "PUBG Mobile 660 UC Satın Al",
      metaDescription:
        "PUBG Mobile 660 UC Türkiye için güvenli ve hızlı satın alma.",
      imgUrl:
        "https://cdn.epinpay.com/image/ep/2025/6/product/pubg-mobile-660-uc-tr-38.webp",
      imgAlt: "PUBG Mobile 660 UC (Türkiye)",
    },
    cheapestOffer: { id: 103 },
    offers: [],
  },

  {
    id: 4,
    category: "PUBG",
    region: "TR",
    platform: "MOBILE",
    type: "PASS",

    status: PRODUCT_STATUS.ACTIVE,

    basePrice: null,
    epPrice: 227,

    translation: {
      id: 4,
      typeId: 4,
      locale: "tr",
      name: "PUBG Mobile Elite Royale Pass",
      slug: "pubg-mobile-elite-royale-pass-tr",
      description: "PUBG Mobile Elite Royale Pass Türkiye bölgesi.",
      metaTitle: "PUBG Mobile Elite Royale Pass Satın Al",
      metaDescription: "PUBG Mobile Elite Royale Pass TR için satın alma.",
      imgUrl:
        "https://cdn.epinpay.com/image/ep/2025/1/product/pubg-mobile-elite-royale-pass-tr-75.webp",
      imgAlt: "PUBG Mobile Elite Royale Pass (TR)",
    },
    cheapestOffer: { id: 104 },
    offers: [],
  },

  {
    id: 5,
    category: "PUBG",
    region: "GLOBAL",
    platform: "MOBILE",
    type: "PASS",

    status: PRODUCT_STATUS.ACTIVE,

    basePrice: 225,
    epPrice: 225,

    translation: {
      id: 5,
      typeId: 5,
      locale: "en",
      name: "PUBG Mobile Elite Royale Pass",
      slug: "pubg-mobile-elite-royale-pass-global",
      description: "PUBG Mobile Elite Royale Pass Global.",
      metaTitle: "PUBG Mobile Elite Royale Pass Global",
      metaDescription: "Buy PUBG Mobile Elite Royale Pass Global.",
      imgUrl:
        "https://cdn.epinpay.com/image/ep/2025/1/product/pubg-mobile-elite-royale-pass-global-88.webp",
      imgAlt: "PUBG Mobile Elite Royale Pass (Global)",
    },
    cheapestOffer: { id: 105 },
    offers: [],
  },
];
