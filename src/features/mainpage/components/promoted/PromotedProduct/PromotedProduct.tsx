import { NavLink, TrustLabels } from "@/components/common";

interface PromotedProductProps {
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
  product,
  productVariants,
}: PromotedProductProps) {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col gap-3">
        {/* Heading */}
        <h1 className="leading-[150%] max-w-92.75 text-3xl font-bold bg-linear-to-r from-white to-[#24d7ff] bg-clip-text text-transparent">
          Oyun paranı anında yükle oyundan hiç kopma
        </h1>

        {/* Trust Labels */}
        <TrustLabels
          labelList={["instantDelivery", "licencedEpins", "securePayment"]}
          type="colorful"
        />
      </div>

      {/* Promoted Product */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <p>{product.name}</p>
          <NavLink
            title="Tüm Ürünleri Gör"
            url={product.slug}
            titleType="highlight"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {productVariants.map((item, index) => (
            <NavLink
              key={index}
              title={item.name}
              url={item.slug}
              type="withContainer"
              helper={`$ ${item.price}`}
              helperType="green"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
