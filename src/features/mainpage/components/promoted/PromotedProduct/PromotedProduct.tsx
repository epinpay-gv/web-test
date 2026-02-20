import { TrustLabels } from "@/components/common";
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
  return (
    <div className="flex flex-col gap-3">
      {/* Heading */}
      <h1 className="max-w-92.75 text-3xl font-bold bg-linear-to-r from-white to-[#24d7ff] bg-clip-text text-transparent">
        Oyun paranı anında yükle oyundan hiç kopma
      </h1>

      {/* Info icons */}
      <TrustLabels
        labelList={["instantDelivery", "licencedEpins", "securePayment"]} type="colorful"
      />

      {(section === "bottom" || section === "all") && (
        <>
          <SectionHeader title={product.name} actionLabel="Tüm Ürünleri Gör" />

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
