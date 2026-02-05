"use client";
import { ProductCard } from "@/components/common/Cards/ProductCard/ProductCard";
import { AddToCartPayload, NotifyWhenAvailablePayload, ProductCardOrientation,} from "@/components/common/Cards/ProductCard/types";
import { Product } from "@/types/types";

interface ProductGridProps {
  data: Product[];
}

export default function ProductGrid({ data }: ProductGridProps) {
  return (
    <>
          <div className="mx-auto flex flex-col gap-8">
        {data.map((productCard) => (
          <ProductCard
          orientation={ProductCardOrientation.HORIZONTAL}
            product={productCard}
            key={productCard.id}
            addToCart={function (payload: AddToCartPayload): void {
              throw new Error("Function not implemented.");
            }}
            notifyWhenAvailable={function (
              payload: NotifyWhenAvailablePayload,
            ): void {
              throw new Error("Function not implemented.");
            }}
            addToFavorites={function (
              payload: NotifyWhenAvailablePayload,
            ): void {
              throw new Error("Function not implemented.");
            }}
          />
        ))}
      </div>
      {/* <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-max">
        {data.map((productCard) => (
          <ProductCard
            product={productCard}
            key={productCard.id}
            addToCart={function (payload: AddToCartPayload): void {
              throw new Error("Function not implemented.");
            }}
            notifyWhenAvailable={function (
              payload: NotifyWhenAvailablePayload,
            ): void {
              throw new Error("Function not implemented.");
            }}
            addToFavorites={function (
              payload: NotifyWhenAvailablePayload,
            ): void {
              throw new Error("Function not implemented.");
            }}
          />
        ))}
      </div> */}
    </>
  );
}
