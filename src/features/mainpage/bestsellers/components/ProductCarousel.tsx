// features/bestsellers/components/ProductCarousel.tsx
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types/types";
import { ProductCard } from "@/components/common/Cards/ProductCard/ProductCard";
import { AddToCartPayload, NotifyWhenAvailablePayload } from "@/components/common/Cards/ProductCard/types";

interface ProductCarouselProps {
  products: Product[];
  showControls?: boolean;
  loop?: boolean;
}

export function ProductCarousel({
  products,
  showControls = true,
  loop = false,
}: ProductCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: loop,
      }}
      className="w-full py-5"
    >
      <CarouselContent className="-ml-4">
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="pl-4 basis-auto"
          >
            <ProductCard product={product} addToCart={function (payload: AddToCartPayload): void {
              throw new Error("Function not implemented.");
            } } notifyWhenAvailable={function (payload: NotifyWhenAvailablePayload): void {
              throw new Error("Function not implemented.");
            } } addToFavorites={function (payload: NotifyWhenAvailablePayload): void {
              throw new Error("Function not implemented.");
            } } />
          </CarouselItem>
        ))}
      </CarouselContent>
      {showControls && (
        <>
          <CarouselPrevious className="hidden md:flex -left-4" />
          <CarouselNext className="hidden md:flex -right-4" />
        </>
      )}
    </Carousel>
  );
}