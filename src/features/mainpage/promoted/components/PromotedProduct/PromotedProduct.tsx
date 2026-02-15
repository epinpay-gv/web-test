import { BadgeCheck, ChevronDoubleRight, Wallet } from "flowbite-react-icons/outline";
import FeatureItem from "@/components/common/Label/FeatureItem";
import SectionHeader from "@/components/common/Label/SectionHeader";
import ProductCard from "@/components/common/NavLinks/NavCards/ProductCard";

type PromotedProductSection = "top" | "bottom" | "all";

interface PromotedProductProps {
  section?: PromotedProductSection;
  product: {
    name: string;
    slug: string;
  };
  productVariants: {
    id: number;
    name: string;
    price: number;
    slug: string;
  }[];
}

export default function PromotedProduct({
  section = "all",
  product,
  productVariants,
}: PromotedProductProps) {
  const infoItems = [
    { icon: ChevronDoubleRight, title: "Anında Teslimat" },
    { icon: BadgeCheck, title: "Lisanslı Epinler" },
    { icon: Wallet, title: "Güvenli Ödeme" },
  ];

  return (
    <div>
      {/* Heading */}
      {(section === "top" || section === "all") && (
        <div className="text-3xl font-bold">
          <p className="bg-linear-to-r from-white to-[#24d7ff] bg-clip-text text-transparent">
            Oyun paranı anında yükle
          </p>
          <p className="bg-linear-to-r from-white to-[#24d7ff] bg-clip-text text-transparent">
            oyundan hiç kopma
          </p>
        </div>
      )}

      {/* Info icons */}
      {(section === "top" || section === "all") && (
        <div className="mt-3 flex gap-6">
          {infoItems.map((item, index) => (
            <FeatureItem key={index} icon={item.icon} title={item.title} />
          ))}
        </div>
      )}

      {(section === "bottom" || section === "all") && (
        <>
          <SectionHeader
            title={product.name}
            actionLabel="Tüm Ürünleri Gör"
          />

          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
            {productVariants.map((item, index) => (
              <ProductCard key={index} title={item.name} price={item.price} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
