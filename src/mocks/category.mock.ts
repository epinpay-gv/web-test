
import { FilterGroupConfig } from "@/features/catalog/catalog.types";

export const categoryFilterGroups: FilterGroupConfig[] = [
  {
    titleData: {
      title: "Fiyat",
      isUnderlined: true,
      titleColor: "text-body",
    },
    elements: [{ type: "range", key: "price", min: 0, max: 10000 }],
    isTab: false,
  },
  {
    elements: [
      {
        type: "toggle",
        key: "in-tr",
        label: "Türkiye'de kullanılabilenleri göster",
      },
    ],
    isTab: false,
  },
  {
    elements: [
      {
        type: "toggle",
        key: "in-stock",
        label: "Stoktakileri göster",
      },
    ],
    isTab: false,
  },
  {
    titleData: {
      title: "Platform",
      isUnderlined: true,
      titleColor: "text-body",
    },
    elements: [
      {
        type: "checkbox",
        key: "platform",
        options: [
          { label: "Riot Games", value: "1" },
          { label: "Playstation Gift Cards", value: "2",},
          { label: "Google Play Gift Cards", value: "3",},
          { label: "Mobile Games", value: "4" },
          { label: "Steam", value: "5" },
          { label: "PC Games", value: "6" },
        ],
        search: {
          placeholder: "Ara",
        },
      },
    ],
    isTab: false,
  },
  {
    titleData: {
      title: "Bölge",
      isUnderlined: true,
      titleColor: "text-body",
    },
    elements: [
      {
        type: "checkbox",
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
          { label: "USA", value: "56" },
        ],
        search: {
          placeholder: "Ara",
        },
      },
    ],
    isTab: false,
  },
  {
    titleData: {
      title: "Ürün Tipi",
      isUnderlined: true,
      titleColor: "text-body",
    },
    elements: [
      {
        type: "checkbox",
        key: "productType",
        options: [
          { label: "Tüm Ürünler", value: "all" },
          { label: "Yazılım ve Lisanlar", value: "1" },
          { label: "Cüzdan Kodları ve Hediye Kartları", value: "2" },
          { label: "Oyun Pinleri", value: "3" },
          { label: "Konsol ve Abonelik Hizmetleri", value: "4" },
          { label: "Skin ve Dijital İtem Pazarı", value: "5" },
        ],
        search: {
          placeholder: "Ara",
        },
      },
    ],
    isTab: true,
  },
];
