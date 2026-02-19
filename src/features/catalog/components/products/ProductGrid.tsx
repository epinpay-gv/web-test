"use client";
import Image from "next/image";
import { Button, ProductCard } from "@/components/common";
import { AddToCartPayload, ChangeQuantityPayload, NotifyWhenAvailablePayload } from "@/components/common/Cards/ProductCard/types";
import { Product } from "@/types/types";

interface ProductGridProps {
  data: Product[];
}

export default function ProductGrid({ data }: ProductGridProps) {
  return (
    <>
      {data.length > 0 ? (
        <div className="mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-max">
          {data.map((productCard, index) => (
            <ProductCard
              product={productCard}
              key={index}
              addToCart={function (payload: AddToCartPayload): void {
                throw new Error("Function not implemented.");
              }}
              notifyWhenAvailable={function (
                payload: NotifyWhenAvailablePayload,
              ): void {
                throw new Error("Function not implemented.");
              }}
              addToFavorites={function (
                payload: NotifyWhenAvailablePayload,
              ): void {
                throw new Error("Function not implemented.");
              }}
              changeQuantity={function (payload: ChangeQuantityPayload): void {
                throw new Error("Function not implemented.");
              }}
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
          <div className="text-xl font-semibold">Ürün bulunamadı</div>
          <div className="text-sm font-normal">Arama kriterlerinize göre ürün bulunamadı.</div>
          <Button
            padding="sm"
            textSize="sm"
            text="Tüm Ürünleri Görüntüle"
            variant="brand"
            onClick={() => {}}
            className="max-w-48"
          />
        </div>
      )}
    </>
  );
}
