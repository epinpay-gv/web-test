"use client";
import { Button } from "../../../Button/Button";
import { CartPlusAlt } from "flowbite-react-icons/outline";
import { AddToCartPayload } from "../types";

interface ActionButtonsProps {
  addToCart: (payload: AddToCartPayload) => void;
}

export function ActionButtons({ addToCart }: ActionButtonsProps) {
  return (
    <div className="flex justify-between gap-2">
      <Button
        padding="sm"
        textSize="sm"
        variant="secondary"
        text="Sepete Ekle"
        className="hidden md:block"
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
        padding="sm"
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
        textSize="sm"
        variant="brand"
        text="Hemen Al"
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
