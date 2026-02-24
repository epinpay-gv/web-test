"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types/types";
import { ProductCard } from "@/components/common";
import { useBasketActions } from "@/features/catalog/hooks/basket/useBasketActions";

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
  const { addToCart, changeQuantity, addToFavorites, notifyWhenAvailable } =
    useBasketActions();

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
          <CarouselItem key={product.id} className="pl-4 basis-auto">
            <ProductCard
              product={product}
              addToCart={addToCart}
              notifyWhenAvailable={notifyWhenAvailable}
              addToFavorites={addToFavorites}
              changeQuantity={changeQuantity}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {showControls && (
        <>
          <CarouselPrevious className="hidden md:flex bg-(--bg-quaternary-medium) border-none" />
          <CarouselNext className="hidden md:flex bg-(--bg-quaternary-medium) border-none " />
        </>
      )}
    </Carousel>
  );
}
