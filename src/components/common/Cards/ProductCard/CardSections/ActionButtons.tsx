"use client";
import { Button } from "../../../Button/Button";
import { CartPlusAlt } from "flowbite-react-icons/outline";
import { AddToCartPayload } from "../types";

interface ActionButtonsProps {
  isHorizontal : boolean;
  addToCart: (payload: AddToCartPayload) => void;
}

export function ActionButtons({ isHorizontal, addToCart }: ActionButtonsProps) {
  return (
    <div className={`flex justify-between gap-2 ${isHorizontal ? "w-50" : ""}`}>
      <Button
        padding="sm"
        textSize="xs"
        variant="secondary"
        text="Sepete Ekle"
        className="hidden md:block w-full font-medium"
        onClick={() =>
          addToCart?.({
            action: "string",
            offerId: 0,
            count: 0,
            isBuyNow: false,
          })
        }
      />
      <Button
        padding="xs"
        textSize="sm"
        variant="secondary"
        icon={<CartPlusAlt />}
        className="block md:hidden"
        onClick={() =>
          addToCart?.({
            action: "string",
            offerId: 0,
            count: 0,
            isBuyNow: true,
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
            action: "string",
            offerId: 0,
            count: 0,
            isBuyNow: true,
          })
        }
      />
    </div>
  );
}
