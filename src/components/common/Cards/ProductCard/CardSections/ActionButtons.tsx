"use client";
import { CartPlusAlt } from "flowbite-react-icons/outline";
import { AddToCartPayload } from "../types";
import { Button } from "@/components/common";

interface ActionButtonsProps {
  isHorizontal : boolean;
  orientation?: "horizontal" | "vertical";
  addToCart: (payload: AddToCartPayload) => void;
}

export function ActionButtons({ isHorizontal, orientation = "horizontal", addToCart }: ActionButtonsProps) {
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
            action: "string",
            offerId: 0,
            count: 0,
            isBuyNow: false,
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
