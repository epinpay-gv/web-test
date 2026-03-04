import { Product } from "@/types/types";

interface PriceSectionProps {
  isLoading?: boolean;
  product: Product;
}
export function PriceSection({
  isLoading = false,
  product,
}: PriceSectionProps) {
  if (isLoading) {
    return (
      <p className="gap-2 flex items-center justify-end">
        {/* fakePrice */}
        <span className="h-4 w-8 rounded bg-gray-200 shimmer" />
        {/* discountRate" */}
        <span className="h-4 w-10 rounded bg-gray-200 shimmer" />
        {/* basePrice */}
        <span className="h-4 w-14 rounded bg-gray-200 shimmer" />
      </p>
    );
  }
  return (
    <p className="gap-2 flex items-center justify-end ">
      {product.fakePrice && (
        <span className="text-body text-sm line-through ">
          {product.fakePrice}
        </span>
      )}
      {product.discountRate && (
        <span className="text-fg-brand-strong text-sm">
          -{product.discountRate}%
        </span>
      )}
      <span className="text-fg-success-strong font-semibold">
        ${product.basePrice}
      </span>
    </p>
  );
}
