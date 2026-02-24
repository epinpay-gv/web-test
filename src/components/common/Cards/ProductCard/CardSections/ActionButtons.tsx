"use client";
import { CartPlusAlt } from "flowbite-react-icons/outline";
import { Button } from "@/components/common";
import { AddToCartPayload } from "@/features/catalog/catalog.types";
import { Product } from "@/types/types";

interface ActionButtonsProps {
  product: Product;
  isHorizontal : boolean;
  orientation?: "horizontal" | "vertical";
  addToCart: (payload: AddToCartPayload) => void;
}

export function ActionButtons({ product, isHorizontal, orientation = "horizontal", addToCart }: ActionButtonsProps) {
  return (
    <div className={`flex justify-between gap-2 ${isHorizontal ? "w-50" : ""} ${orientation === "horizontal" ? "flex-row" : "flex-col"}`}>
      <Button
        padding="sm"
        textSize="xs"
        variant="secondary"
        text="Sepete Ekle"
        className="hidden md:block w-full font-medium"
        onClick={() =>
          addToCart?.({
            productId: product.id,
            offerId: product.cheapestOffer?.id || 0,
            quantity: 1
          })
        }
      />
      <Button
        padding="sm"
        textSize="xs"
        variant="secondary"
        icon={<CartPlusAlt />}
        className="block md:hidden"
        onClick={() =>
          addToCart?.({
            productId: product.id,
            offerId: product.cheapestOffer?.id || 0,
            quantity: 1
          })
        }
      />
      <Button
        padding="sm"
        textSize="xs"
        variant="brand"
        text="Hemen Al"
        className="w-full font-medium"
        onClick={() =>
          addToCart?.({
            productId: product.id,
            offerId: product.cheapestOffer?.id || 0,
            quantity: 1
          })
        }
      />
    </div>
  );
}
