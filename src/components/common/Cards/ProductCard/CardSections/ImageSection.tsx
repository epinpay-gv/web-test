"use client";
import Image from "next/image";
import { FavButton } from "@/components/common";
import { Product } from "@/types/types";
import { AddToFavoritesPayload } from "@/features/catalog/catalog.types";

const sizeClasses = {
  vertical: "aspect-square w-36.5 h-36.5 md:w-50 md:h-50",
  horizontal: {
    default: "w-16 h-16 md:w-33.5 md:h-33.5",
    cart: "w-16 h-16 md:w-27.5 md:h-27.5", 
  },
};

interface ImageSectionProps {
  product: Product;
  isHorizontal: boolean;
  isInCart?: boolean;
  addToFavorites: (payload: AddToFavoritesPayload) => void;
}

export function ImageSection({
  product,
  isHorizontal,
  isInCart,
  addToFavorites,
}: ImageSectionProps) {

  const sizeClass = isHorizontal
    ? isInCart
      ? sizeClasses.horizontal.cart
      : sizeClasses.horizontal.default
    : sizeClasses.vertical;

  return (
    <div
      className={`relative ${sizeClass}`}
    >
      <div
        className={`absolute top-2 right-2 z-10 ${isHorizontal ? "hidden md:block" : ""}`}
      >
        <FavButton
          isFavorite={product.isFavorite}
          addToFavorites={() =>
            addToFavorites?.({
              productId: product.id
            })
          }
        />
      </div>

      <Image
        src={product.translation.imgUrl}
        alt={product.translation.imgAlt}
        fill
        sizes="(max-width: 768px) 100vw, 224px"
        className="object-contain rounded mx-auto"
      />
    </div>
  );
}
