"use client"
import { ProductCard } from "@/components/common/Cards/ProductCard/ProductCard";
import {
  AddToCartPayload,
  NotifyWhenAvailablePayload,
} from "@/components/common/Cards/ProductCard/types";
import { Product } from "@/types/types";

interface ProductGridProps {
  data: Product[];
}

export default function ProductGrid({ data}: ProductGridProps) {
  return (
    <>
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((productCard, index) => (
          <ProductCard
            product={productCard}
            key={index} addToCart={function (payload: AddToCartPayload): void {
              throw new Error("Function not implemented.");
            } } notifyWhenAvailable={function (payload: NotifyWhenAvailablePayload): void {
              throw new Error("Function not implemented.");
            } } addToFavorites={function (payload: NotifyWhenAvailablePayload): void {
              throw new Error("Function not implemented.");
            } }          />
        ))}
      </div>
    </>
  );
}
