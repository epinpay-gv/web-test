import { ProductPageData } from "@/features/category/types";
import { PRODUCT_STATUS } from "@/types/types";

export const mockProducts:  ProductPageData[] = [
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
   {
    id: 55,
    category: "LOL",
    region: "TR",
    platform: "PC",
    type: "RP",

    status: PRODUCT_STATUS.ACTIVE,

    basePrice: null,
    epPrice: null,
    discountRate: 12,

    translation: {
      id: 55,
      typeId: 3,
      locale: "tr",
      name: "3930 League of Legends RP",
      slug: "3930-league-of-legends-rp-tr",
      description:
        "League of Legends RP satın al! Epinpay ile anında teslimat, güvenli ödeme.",
      metaTitle: "3930 LoL RP Satın Al",
      metaDescription:
        "3930 LoL RP (Riot Pin) TR | Uygun Fiyat ve Hızlı Teslimat",
      imgUrl:
        "https://cdn.epinpay.com/image/ep/2025/1/product/3930-league-of-legends-rp-tr-43.webp",
      imgAlt:
        "3930 LoL RP (Riot Pin) TR | Uygun Fiyat ve Hızlı Teslimat",
    },

    cheapestOffer: { id: 105 },
    offers: [],
  },

  {
    id: 1128,
    category: "LOL",
    region: "NA",
    platform: "PC",
    type: "RP",

    status: PRODUCT_STATUS.ACTIVE,

    basePrice: null,
    epPrice: null,
    discountRate: 12,

    translation: {
      id: 1128,
      typeId: 3,
      locale: "en",
      name: "League of Legends 20 USD Riot Access NA",
      slug: "league-of-legends-20-usd-riot-acces-na",
      description:
        "League of Legends RP satın al! Epinpay ile anında teslimat, güvenli ödeme.",
      metaTitle: "LoL 20 USD Riot Access NA",
      metaDescription: "League of Legends 20 USD Riot Access NA | Epinpay",
      imgUrl:
        "https://cdn.epinpay.com/image/ep/2025/1/product/league-of-legends-20-usd-riot-acces-na-28.webp",
      imgAlt: "League of Legends 20 USD Riot Access NA | Epinpay",
    },

    cheapestOffer: { id: 105 },
    offers: [],
  },

  {
    id: 1149,
    category: "LOL",
    region: "UK",
    platform: "PC",
    type: "RP",

    status: PRODUCT_STATUS.ACTIVE,

    basePrice: null,
    epPrice: null,
    discountRate: 12,

    translation: {
      id: 1149,
      typeId: 3,
      locale: "en",
      name: "League of Legends 50 GBP UK",
      slug: "league-of-legends-50-gbp-uk",
      description:
        "League of Legends RP satın al! Epinpay ile anında teslimat, güvenli ödeme.",
      metaTitle: "LoL 50 GBP UK",
      metaDescription: "League of Legends 50 GBP - UK | Epinpay",
      imgUrl:
        "https://cdn.epinpay.com/image/ep/2025/1/product/league-of-legends-50-gbp-uk-8.webp",
      imgAlt: "League of Legends 50 GBP - UK | Epinpay",
    },

    cheapestOffer: { id: 105 },
    offers: [],
  },

  {
    id: 1138,
    category: "LOL",
    region: "EUW",
    platform: "PC",
    type: "RP",

    status: PRODUCT_STATUS.ACTIVE,

    basePrice: null,
    epPrice: null,
    discountRate: 12,

    translation: {
      id: 1138,
      typeId: 3,
      locale: "en",
      name: "League of Legends 2.50 EUR Riot Points EU West",
      slug: "league-of-legends-250-eur-riot-points-eu-west",
      description:
        "League of Legends RP satın al! Epinpay ile anında teslimat, güvenli ödeme.",
      metaTitle: "LoL 2.50 EUR EUW",
      metaDescription: "League of Legends 2.50 EUR Riot Points EU West | Epinpay",
      imgUrl:
        "https://cdn.epinpay.com/image/ep/2025/1/product/league-of-legends-250-eur-riot-points-eu-west-8.webp",
      imgAlt: "League of Legends 2.50 EUR Riot Points EU West | Epinpay",
    },

    cheapestOffer: { id: 105 },
    offers: [],
  },

  {
    id: 2784,
    category: "LOL",
    region: "TR",
    platform: "PC",
    type: "RP",

    status: PRODUCT_STATUS.ACTIVE,

    basePrice: null,
    epPrice: null,
    discountRate: 12,

    translation: {
      id: 2784,
      typeId: 3,
      locale: "tr",
      name: "250 League of Legends RP",
      slug: "250-league-of-legends-rp",
      description:
        "League of Legends RP satın al! Epinpay ile anında teslimat, güvenli ödeme.",
      metaTitle: "250 LoL RP Satın Al",
      metaDescription: "250 LoL RP (Riot Pin) TR | Uygun Fiyat ve Hızlı Teslimat",
      imgUrl:
        "https://cdn.epinpay.com/image/ep/2025/5/product/250-league-of-legends-rp-38.webp",
      imgAlt: "250 LoL RP (Riot Pin) TR | Uygun Fiyat ve Hızlı Teslimat",
    },

    cheapestOffer: { id: 105 },
    offers: [],
  },
];
