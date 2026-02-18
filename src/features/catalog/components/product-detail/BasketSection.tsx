"use client";
import { Button } from "@/components/common";
import { ActionButtons } from "@/components/common/Cards/ProductCard/CardSections";
import { AddToCartPayload } from "@/components/common/Cards/ProductCard/types";
import { Product } from "@/types/types";

interface BasketSectionProps {
  data: Product;
}

export default function BasketSection({ data }: BasketSectionProps) {
  return (
    <div className="flex flex-col gap-4 w-60">
      {/* PRICE */}
      <div className="card-container py-6 px-4 text-xl text-(--text-heading) font-semibold">
        $ {data.basePrice}
      </div>
      {/* ACTION BUTTONS */}
      <ActionButtons
        isHorizontal={false}
        orientation="vertical"
        addToCart={function (payload: AddToCartPayload): void {
          throw new Error("Function not implemented.");
        }}
      />
      {/* EP POINT INFO */}
      <div className="card-container py-6 px-4 ">
        <p className="text-sm font-semimbold text-(--text-fg-yellow)">
          Ep Puan ne işe yarar?
        </p>
        <ul className="text-xs font-normal">
          <li>Ep puan ile satılan özel ürünleri alabilirsiniz</li>
          <li>Harcadığınız tutarda ep puan kazanırsınız</li>
        </ul>
      </div>
      {/* SECURE PAYMENT */}
      <div className="card-container py-6 px-4 ">
        <p className="text-sm font-semimbold text-(--text-fg-yellow)">
          Ep Puan ne işe yarar?
        </p>
        <ul className="text-xs font-normal">
          <li>Ep puan ile satılan özel ürünleri alabilirsiniz</li>
          <li>Harcadığınız tutarda ep puan kazanırsınız</li>
        </ul>
      </div>
    </div>
  );
}
