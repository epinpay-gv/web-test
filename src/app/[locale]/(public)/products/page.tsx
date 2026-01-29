import { createSeo } from "@/lib/seo";
import { CategorySchema } from "@/components/seo/CategorySchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ProductCard } from "@/components/common/Cards/ProductCard/ProductCard";
import {
  ProductCardOrientation,
  ProductCardType,
} from "@/components/common/Cards/ProductCard/types";

interface ProductCardProps {
  img: string;
  img_alt: string;
  title: string;
  location: string;
  price: string;
  discountRate?: string;
  fakePrice?: string;
}

export const productCardData: ProductCardProps[] = [
  {
    img: "https://cdn.epinpay.com/image/ep/2025/6/product/pubg-mobile-60-uc-tr-5.webp",
    img_alt: "PUBG Mobile 60 UC (Türkiye) Satın Al | Epinpay",
    title: "PUBG Mobile 60 UC",
    location: "Türkiye",
    price: "36.50 ₺",
    fakePrice: "41.00 ₺",
    discountRate: "%11",
  },
  {
    img: "https://cdn.epinpay.com/image/ep/2025/6/product/pubg-mobile-325-uc-tr-15.webp",
    img_alt: "PUBG Mobile 325 UC (Türkiye) Satın Al | Epinpay",
    title: "PUBG Mobile 325 UC",
    location: "Türkiye",
    price: "182.95 ₺",
    fakePrice: "210.00 ₺",
    discountRate: "%13",
  },
  {
    img: "https://cdn.epinpay.com/image/ep/2025/6/product/pubg-mobile-660-uc-tr-38.webp",
    img_alt: "PUBG Mobile 660 UC (Türkiye) Satın Al | Epinpay",
    title: "PUBG Mobile 660 UC",
    location: "Türkiye",
    price: "365.95 ₺",
    fakePrice: "418.00 ₺",
    discountRate: "%12",
  },
  {
    img: "https://cdn.epinpay.com/image/ep/2025/6/product/pubg-mobile-1800-uc-tr-36.webp",
    img_alt: "PUBG Mobile 1800 UC (Türkiye) Satın Al | Epinpay",
    title: "PUBG Mobile 1800 UC",
    location: "Türkiye",
    price: "915.00 ₺",
    fakePrice: "1000.00 ₺",
    discountRate: "%8",
  },
  {
    img: "https://cdn.epinpay.com/image/ep/2025/6/product/pubg-mobile-3850-uc-tr-24.webp",
    img_alt: "PUBG Mobile 3850 UC (Türkiye) Satın Al | Epinpay",
    title: "PUBG Mobile 3850 UC",
    location: "Türkiye",
    price: "1829.50 ₺",
    fakePrice: "2030.00 ₺",
    discountRate: "%10",
  },
  {
    img: "https://cdn.epinpay.com/image/ep/2025/6/product/pubg-mobile-8100-uc-tr-92.webp",
    img_alt: "PUBG Mobile 8100 UC (Türkiye) Satın Al | Epinpay",
    title: "PUBG Mobile 8100 UC",
    location: "Türkiye",
    price: "3659.00 ₺",
    fakePrice: "4035.00 ₺",
    discountRate: "%9",
  },
  {
    img: "https://cdn.epinpay.com/image/ep/2025/1/product/pubg-mobile-elite-royale-pass-tr-75.webp",
    img_alt: "PUBG Mobile Elite Royale Pass (TR) Satın Al | Epinpay",
    title: "PUBG Mobile Elite Royale Pass",
    location: "Türkiye",
    price: "227.00 ₺",
  },
  {
    img: "https://cdn.epinpay.com/image/ep/2025/1/product/pubg-mobile-elite-royale-pass-global-88.webp",
    img_alt: "PUBG Mobile Elite Royale Pass (Global) Satın Al | Epinpay",
    title: "PUBG Mobile Elite Royale Pass",
    location: "Global",
    price: "225.00 ₺",
  },
  {
    img: "https://cdn.epinpay.com/image/ep/2025/10/product/pubg-mobile-1800-uc-top-up-global-94.webp",
    img_alt: "PUBG Mobile 1800 UC GLOBAL Top-Up | Epinpay",
    title: "PUBG Mobile 1800 UC Top-Up",
    location: "Global",
    price: "920.00 ₺",
  },
  {
    img: "https://cdn.epinpay.com/image/ep/2025/11/product/pubg-royale-pass-global-52.webp",
    img_alt: "PUBG Royale Pass Top-Up | Epinpay",
    title: "PUBG Royale Pass",
    location: "Global",
    price: "—",
  },
];

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

  return (
    <>
      {/* SEO Content */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: `${baseUrl}/${locale}` },
          { name: "Products", url: `${baseUrl}/${locale}/products` },
        ]}
      />
      {/* <CategorySchema
        name="Epinpay Categories"
        description="Dijital oyun, epin ve servis kategorileri"
        url={`${baseUrl}/${locale}/categories`}
        locale={locale}
      /> */}

      {/* Page Content */}
      <div className="py-24">
        <h1>$listelenen ürün adı$ listeleniyor.</h1>
        <div className="flex flex-wrap gap-4">
          {productCardData.map((cardProps, index) => (
            <ProductCard
              key={index}
              img={cardProps.img}
              img_alt={cardProps.img_alt}
              title={cardProps.title}
              location={cardProps.location}
              price={cardProps.price}
              discountRate={cardProps.discountRate}
              fakePrice={cardProps.fakePrice}
            />
          ))}
        </div>
      </div>
    </>
  );
}
