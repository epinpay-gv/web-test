import { NavLink, TrustLabels } from "@/components/common";

interface PromotedProductListProps {
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
  className?: string;
}

export default function PromotedProductList({
  product,
  productVariants,
  className,
}: PromotedProductListProps) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex items-center gap-2 w-full">
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
  );
}
