import { FilterGroupConfig } from "@/features/catalog/components/filters/Filters/types";
import { ProductPageData } from "@/features/catalog/types";
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
      metaDescription: "PUBG Mobile 60 UC Türkiye için güvenli ve hızlı satın alma.",
      imgUrl: "https://cdn.epinpay.com/image/ep/2025/6/product/pubg-mobile-60-uc-tr-5.webp",
      imgAlt: "PUBG Mobile 60 UC (Türkiye)",
    },
    cheapestOffer: { id: 101 },
    offers: [],
    isFavorite: true
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
      metaDescription: "PUBG Mobile 325 UC Türkiye için güvenli ve hızlı satın alma.",
      imgUrl: "https://cdn.epinpay.com/image/ep/2025/6/product/pubg-mobile-325-uc-tr-15.webp",
      imgAlt: "PUBG Mobile 325 UC (Türkiye)",
    },
    cheapestOffer: { id: 102 },
    offers: [],
    isFavorite: false
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
      metaDescription: "PUBG Mobile 660 UC Türkiye için güvenli ve hızlı satın alma.",
      imgUrl: "https://cdn.epinpay.com/image/ep/2025/6/product/pubg-mobile-660-uc-tr-38.webp",
      imgAlt: "PUBG Mobile 660 UC (Türkiye)",
    },
    cheapestOffer: { id: 103 },
    offers: [],
    isFavorite: false
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
      imgUrl: "https://cdn.epinpay.com/image/ep/2025/1/product/pubg-mobile-elite-royale-pass-tr-75.webp",
      imgAlt: "PUBG Mobile Elite Royale Pass (TR)",
    },
    cheapestOffer: { id: 104 },
    offers: [],
    isFavorite: false
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
      imgUrl: "https://cdn.epinpay.com/image/ep/2025/1/product/pubg-mobile-elite-royale-pass-global-88.webp",
      imgAlt: "PUBG Mobile Elite Royale Pass (Global)",
    },
    cheapestOffer: { id: 105 },
    offers: [],
    isFavorite: false
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
       description: "League of Legends RP satın al! Epinpay ile anında teslimat, güvenli ödeme.",
       metaTitle: "3930 LoL RP Satın Al",
       metaDescription: "3930 LoL RP (Riot Pin) TR | Uygun Fiyat ve Hızlı Teslimat",
       imgUrl: "https://cdn.epinpay.com/image/ep/2025/1/product/3930-league-of-legends-rp-tr-43.webp",
       imgAlt: "3930 LoL RP (Riot Pin) TR | Uygun Fiyat ve Hızlı Teslimat",
     },

     cheapestOffer: { id: 105 },
     offers: [],
     isFavorite: false
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
      description: "League of Legends RP satın al! Epinpay ile anında teslimat, güvenli ödeme.",
      metaTitle: "LoL 20 USD Riot Access NA",
      metaDescription: "League of Legends 20 USD Riot Access NA | Epinpay",
      imgUrl: "https://cdn.epinpay.com/image/ep/2025/1/product/league-of-legends-20-usd-riot-acces-na-28.webp",
      imgAlt: "League of Legends 20 USD Riot Access NA | Epinpay",
    },

    cheapestOffer: { id: 105 },
    offers: [],
    isFavorite: false
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
      description: "League of Legends RP satın al! Epinpay ile anında teslimat, güvenli ödeme.",
      metaTitle: "LoL 50 GBP UK",
      metaDescription: "League of Legends 50 GBP - UK | Epinpay",
      imgUrl: "https://cdn.epinpay.com/image/ep/2025/1/product/league-of-legends-50-gbp-uk-8.webp",
      imgAlt: "League of Legends 50 GBP - UK | Epinpay",
    },

    cheapestOffer: { id: 105 },
    offers: [],
    isFavorite: false
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
      description: "League of Legends RP satın al! Epinpay ile anında teslimat, güvenli ödeme.",
      metaTitle: "LoL 2.50 EUR EUW",
      metaDescription: "League of Legends 2.50 EUR Riot Points EU West | Epinpay",
      imgUrl: "https://cdn.epinpay.com/image/ep/2025/1/product/league-of-legends-250-eur-riot-points-eu-west-8.webp",
      imgAlt: "League of Legends 2.50 EUR Riot Points EU West | Epinpay",
    },

    cheapestOffer: { id: 105 },
    offers: [],
    isFavorite: false
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
      description: "League of Legends RP satın al! Epinpay ile anında teslimat, güvenli ödeme.",
      metaTitle: "250 LoL RP Satın Al",
      metaDescription: "250 LoL RP (Riot Pin) TR | Uygun Fiyat ve Hızlı Teslimat",
      imgUrl: "https://cdn.epinpay.com/image/ep/2025/5/product/250-league-of-legends-rp-38.webp",
      imgAlt: "250 LoL RP (Riot Pin) TR | Uygun Fiyat ve Hızlı Teslimat",
    },

    cheapestOffer: { id: 105 },
    offers: [],
    isFavorite: false
  },
];

export const filterGroups: FilterGroupConfig[] = [
    {
      titleData: { title: "Fiyat Aralığı" },
      elements: [{ type: "range", key: "price", min: 0, max: 10000 }],
    },
    {
      titleData: {
        title: "Oyunlar",
        isUnderlined: true,
        titleColor: "text-body",
      },
      elements: [
        {
          type: "checkbox",
          key: "games",
          options: [
            {
              label: "League of Legends (LoL RP)",
              value: "league-of-legends-lol-rp",
              count: 128,
            },
            { label: "Apex Legends", value: "apex-legends", count: 42 },
            { label: "PUBG Mobile", value: "pubg-mobile", count: 76 },
            { label: "Free Fire Elmas", value: "free-fire-elmas", count: 33 },
            { label: "Pasha Fencer", value: "pasha-fencer", count: 9 },
            {
              label: "Tom Clancy's Rainbow Six Siege",
              value: "tom-clancys-rainbow-six-siege",
              count: 21,
            },
            { label: "Point Blank", value: "point-blank", count: 18 },
            { label: "Zula Altın", value: "zula-altin", count: 64 },
            {
              label: "Wild Guns Nuggets",
              value: "wild-guns-nuggets",
              count: 11,
            },
            { label: "Xbox", value: "xbox", count: 90 },
            {
              label: "The Lord of the Rings: Rise to War",
              value: "the-lord-of-the-rings-rise-to-war-degerli-tas",
              count: 5,
            },
            {
              label: "Google Play Hediye Kartı",
              value: "google-play-hediye-karti",
              count: 154,
            },
            {
              label: "Playstation Hediye Kartı",
              value: "playstation-hediye-karti",
              count: 203,
            },
            { label: "Razer Gold", value: "razer-gold", count: 47 },
          ],
          search: {
            placeholder: "Oyun ara...",
          },
        },
      ],
    },
    {
      titleData: {
        title: "Platform",
        isUnderlined: true,
        titleColor: "text-body",
      },
      elements: [
        {
          type: "dropdown",
          key: "platform",
          options: [
            { label: "Riot Games", value: "riot-games" },
            {
              label: "Playstation Gift Cards",
              value: "playstation-gift-cards",
            },
            {
              label: "Google Play Gift Cards",
              value: "google-play-gift-cards",
            },
            { label: "Mobile Games", value: "mobile-games" },
            { label: "Xbox Games", value: "xbox-games" },
            { label: "Epic Games", value: "epic-games" },
            { label: "PSN Games", value: "psn-games" },
            { label: "EA App", value: "ea-app" },
            { label: "Nintendo Games", value: "nintendo-games" },
            { label: "PC Games", value: "pc-games" },
            { label: "GameForge", value: "gameforge" },
            { label: "Ubisoft", value: "ubisoft" },
            { label: "Steam", value: "steam" },
            { label: "Origin", value: "origin" },
            { label: "Green Games", value: "green-games" },
            { label: "Playstation Games", value: "playstation-games" },
            { label: "Battle.net", value: "battle-net" },
            { label: "Amazon", value: "amazon" },
            { label: "Browser Games", value: "browser-games" },
            { label: "Razer Gold Gift Cards", value: "razer-gold-gift-cards" },
            { label: "Roblox Games", value: "roblox-games" },
            { label: "PS-XBOX", value: "ps-xbox" },
            { label: "Microsoft Store", value: "microsoft-store" },
            { label: "Online Game Codes", value: "online-game-codes" },
            { label: "NC Soft", value: "nc-soft" },
            { label: "Google Play Games", value: "google-play-games" },
            { label: "Apple Store Games", value: "apple-store-games" },
            { label: "Netflix", value: "netflix" },
            { label: "Itunes", value: "itunes" },
            { label: "Icloud", value: "icloud" },
            { label: "Disney", value: "disney" },
            { label: "Deezer", value: "deezer" },
            { label: "Spotify", value: "spotify" },
            { label: "Twitch", value: "twitch" },
            { label: "Xbox Live", value: "xbox-live" },
            { label: "JoyGame", value: "joygame" },
            { label: "Market & Alışveriş", value: "market-alisveris" },
            { label: "Exxen", value: "exxen" },
            { label: "Windows", value: "windows" },
          ],
        },
      ],
    },
    {
      titleData: {
        title: "Bölge",
        isUnderlined: true,
        titleColor: "text-body",
      },
      elements: [
        {
          type: "dropdown",
          key: "region",
          options: [
            { label: "Global", value: "26" },
            { label: "Turkey", value: "1" },
            { label: "United States", value: "2" },
            { label: "India", value: "3" },
            { label: "Arab Emirates", value: "4" },
            { label: "United Kingdom", value: "5" },
            { label: "Hong Kong", value: "6" },
            { label: "France", value: "7" },
            { label: "Brasil", value: "8" },
            { label: "South Africa", value: "9" },
            { label: "Germany", value: "10" },
            { label: "Saudi Arabia", value: "11" },
            { label: "Poland", value: "12" },
            { label: "Oman", value: "13" },
            { label: "Indonesia", value: "14" },
            { label: "Kuwait", value: "15" },
            { label: "Lebanon", value: "16" },
            { label: "Italy", value: "17" },
            { label: "Canada", value: "18" },
            { label: "Qatar", value: "19" },
            { label: "Bahrein", value: "20" },
            { label: "Spain", value: "21" },
            { label: "Australia", value: "22" },
            { label: "Romania", value: "23" },
            { label: "New Zealand", value: "24" },
            { label: "Malaysia", value: "25" },
          ],
        },
      ],
    },
    {
      titleData: {
        title: "Ürün Tipi",
        isUnderlined: true,
        titleColor: "text-body",
      },
      elements: [
        {
          type: "dropdown",
          key: "productType",
          options: [
            { label: "Key", value: "1" },
            { label: "Gift Card", value: "2" },
            { label: "Epin", value: "3" },
            { label: "Pay Card", value: "4" },
            { label: "Top-Up", value: "5" },
          ],
        },
      ],
    },
    {
      titleData: {
        title: "Kullanılabilirlik",
        isUnderlined: true,
        titleColor: "text-body",
      },
      elements: [
        {
          type: "checkbox",
          key: "usability",
          options: [
            {
              label: "Türkiye'de kullanılabilenleri göster",
              value: "use-in-tr",
            },
            { label: "Stoktakileri göster", value: "in-stock" },
          ],
        },
      ],
    },
  ];