import { Product } from "@/types/types";

interface PriceSectionProps {
  product: Product;
}
export function PriceSection({ product }: PriceSectionProps) {
  return (
    <p className="gap-2 flex items-center justify-end font-medium">
      <span className="text-body text-xs line-through">
        {product.fakePrice}
      </span>
      {product.discountRate && (
        <span className="text-fg-brand-strong text-xs">
          - {product.discountRate} %
        </span>
      )}
      <span className="text-fg-success-strong">$ {product.basePrice}</span>
    </p>
  );
}
