import { Product } from "@/types/types";

interface PriceSectionProps {
  product: Product;
}
export function PriceSection({ product }: PriceSectionProps) {
  return (
    <p className="gap-2 flex items-center justify-end ">
      <span className="text-body text-sm line-through ">
        {product.fakePrice}
      </span>
      {product.discountRate && (
        <span className="text-fg-brand-strong text-sm">
          -{product.discountRate}%
        </span>
      )}
      <span className="text-fg-success-strong font-semibold">${product.basePrice}</span>
    </p>
  );
}
