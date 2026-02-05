"use client";
import Image from "next/image";
import { FavButton } from "@/components/common/Button/FavButton/FavButton";
import { Product } from "@/types/types";
import { NotifyWhenAvailablePayload } from "../types";

interface ImageSectionProps {
  product: Product;
  isHorizontal : boolean;
  addToFavorites: (payload: NotifyWhenAvailablePayload) => void;
}

export function ImageSection({
  product,
  isHorizontal,
  addToFavorites,
}: ImageSectionProps) {
  return (
    <div
      className={`relative ${isHorizontal ? "w-16 h-16 md:w-33.5 md:h-33.5" : "aspect-square w-36.5 h-36.5 md:w-50 md:h-50"}`}
    >
      <div className="absolute top-2 right-2 z-10">
        <FavButton
          isFavorite={product.isFavorite}
          addToFavorites={() =>
            addToFavorites?.({
              productId: product.id,
              userId: 0,
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
