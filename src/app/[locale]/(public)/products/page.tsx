import { createSeo } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import {
  FilterNavBar,
  PageTitle,
  FilterContainer,
  ProductGrid,
} from "@/features/catalog/components/components";
import { ProductsSchema } from "@/components/seo/ProductsSchema";
import { mockProducts } from "@/mocks";
import { FilterGroupConfig } from "@/features/catalog/components/filters/Filters/types";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return createSeo({
    title: params.locale === "en" ? "All Products" : "Tüm Ürünler",
    description:
      params.locale === "en" ? "Browse all products" : "Tüm ürünleri keşfedin",
    canonical: "/products",
    locale: params.locale,
  });
}

export default function ProductsPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const baseUrl = "https://www.epinpay.com";

  const filterGroups: FilterGroupConfig[] = [
    {
      titleData: { title: "Fiyat Aralığı" },
      elements: [
        { type: "range", key: "price", min: 0, max: 10000 }
      ],
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

  const titleData = {
    title: "Filtrele",
    isUnderlined: true,
  };

  return (
    <>
      {/* SEO Content */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Products", url: `${baseUrl}/${locale}/products` },
        ]}
      />
      <ProductsSchema
        name="Epinpay Products"
        description="Epinpay ürünleri"
        url={`${baseUrl}/${locale}/products`}
        locale={locale}
      />

      {/* Page Content */}
      <div className="container max-w-7xl mx-auto pb-12">
        {/* <FilterNavBar data={filterData} /> */}
        <PageTitle
          data={{
            title: "Tüm ürünler ",
            totalProductAmount: 2173,
          }}
          changeOrder={function (order: string): void {
            throw new Error("Function not implemented.");
          }}
        />
        <div className="flex gap-4">
          <FilterContainer titleData={titleData} groups={filterGroups} />
          <ProductGrid data={mockProducts} />
        </div>
      </div>
    </>
  );
}
