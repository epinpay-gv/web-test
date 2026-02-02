import { ProductCard } from "@/components/common/Cards/ProductCard/ProductCard";
import { Product } from "@/types/types";

interface ProductGridProps {
  data: Product[];
}

export default function ProductGrid({ data }: ProductGridProps) {
  return (
    <>
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((productCard, index) => (
          <ProductCard product={productCard} key={index} />
        ))}
      </div>
    </>
  );
}
