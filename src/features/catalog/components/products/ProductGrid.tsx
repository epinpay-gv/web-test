"use client";
import Image from "next/image";
import { Button, ProductCard } from "@/components/common";
import { Product } from "@/types/types";
import { AddToFavoritesPayload, AddToCartPayload, ChangeQuantityPayload, NotifyWhenAvailablePayload } from "../../catalog.types";
import { useTranslations } from "next-intl";

interface ProductGridProps {
  data: Product[];
  addToCart: (payload: AddToCartPayload) => void;
  notifyWhenAvailable: (payload: NotifyWhenAvailablePayload) => void;
  addToFavorites: (payload: AddToFavoritesPayload) => void;
  changeQuantity: (payload: ChangeQuantityPayload) => void;
}

export default function ProductGrid({ data, addToCart, notifyWhenAvailable, addToFavorites, changeQuantity }: ProductGridProps) {
  const t = useTranslations("common.messages");
  const tBtn = useTranslations("common.buttons");

  return (
    <>
      {data.length > 0 ? (
        <div className="mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-max">
          {data.map((productCard, index) => (
            <ProductCard
              product={productCard}
              key={index}
              addToCart={addToCart}
              notifyWhenAvailable={notifyWhenAvailable}
              addToFavorites={addToFavorites}
              changeQuantity={changeQuantity}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 min-h-screen">
          <Image
            src="/illustrations/gaming-controller-ghosts-dark.svg"
            alt="product-not-found"
            className="object-contain"
            width={300}
            height={300}
          />
          <div className="text-xl font-semibold">{t("productNotFound")}</div>
          <div className="text-sm font-normal">
            {t("productNotFoundDesc")}
          </div>
          <Button
            padding="sm"
            textSize="sm"
            text={tBtn("viewAllProductsBtn")}
            variant="brand"
            onClick={() => {}}
            className="max-w-48"
          />
        </div>
      )}
    </>
  );
}
