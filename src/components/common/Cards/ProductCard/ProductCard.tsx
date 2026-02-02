import Image from "next/image";
import { Button } from "../../Button/Button";
import { DesktopPc } from "flowbite-react-icons/outline";
import { Product } from "@/types/types";
import { AddToCartPayload, NotifyWhenAvailablePayload, ProductCardOrientation } from "./types";
import { CartPlusAlt } from "flowbite-react-icons/outline";

/* *B*/
// TODO : mobilde hemen al butonu sepet emojisi olacak, butonda revize gerekiyor. ayrıca butonun tam büyüyebilmesi lazım
// TODO : yatay kart eklenecek
// TODO : favori butonu eklenecek
interface ProductCardProps {
  product: Product;
  orientation?: ProductCardOrientation;
  addToCart?: (payload : AddToCartPayload) => void;
  notifyWhenAvailable?: (payload : NotifyWhenAvailablePayload) => void;
  addToFavorites?: (payload : NotifyWhenAvailablePayload) => void;
}

export function ProductCard({ product, orientation, addToCart, notifyWhenAvailable, addToFavorites }: ProductCardProps) {


  return (
    <>
      <div className="product-card-container p-3 gap-1 flex flex-col justify-between w-42.5 h-79 md:w-56 md:h-92.5">
        {/* Fav button */}
        {/* Image */}
        <div className="relative aspect-square w-36.5 h-36.5 md:w-50 md:h-50">
          <Image
            src={product.translation.imgUrl}
            alt={product.translation.imgAlt}
            fill
            sizes="(max-width: 768px) 100vw, 224px"
            className="object-contain rounded mx-auto"
          />
        </div>

        <div className="space-y-2">
          {/* text */}
          <p className="max-w-50 truncate">{product.translation.name}</p>
          {/* product info : with stock / without stock*/}
          {product.basePrice ? (
            <>
              <div className="text-xs flex gap-2 items-center">
                <DesktopPc size={20} />
                <span className="text-body"> {product.region}</span>
              </div>

              <p className="gap-2 flex items-center justify-end font-medium">
                <span className="text-body text-xs line-through">
                  {product.fakePrice}
                </span>
                {product.discountRate && (
                  <span className="text-fg-brand-strong text-xs">
                    - {product.discountRate}
                  </span>
                )}
                <span className="text-fg-success-strong">
                  {product.basePrice}
                </span>
              </p>
              {/* buttons */}
              <div className="flex justify-between">
                <Button
                  padding="sm"
                  textSize="sm"
                  variant="secondary"
                  text="Sepete Ekle"
                  className="hidden md:block"
                  onClick={() => addToCart?.({
                    action: "string",
                    offerId: 0,
                    count: 0,
                    isBuyNow: false
                  })}
                />
                <Button
                  padding="sm"
                  textSize="sm"
                  variant="secondary"
                  icon={<CartPlusAlt />}
                  className="block md:hidden"
                  onClick={() => addToCart?.({
                    action: "string",
                    offerId: 0,
                    count: 0,
                    isBuyNow: true
                  })}
                />
                <Button
                  padding="sm"
                  textSize="sm"
                  variant="brand"
                  text="Hemen Al"
                  onClick={() => addToCart?.({
                    action: "string",
                    offerId: 0,
                    count: 0,
                    isBuyNow: true
                  })}
                />
              </div>
            </>
          ) : (
            <>
              <div className="text-xs flex gap-2 items-center">
                <DesktopPc size={20} />
                <span className="text-body"> {product.region}</span>
              </div>

              <p className="gap-2 flex items-center justify-end font-medium">
                <span className="text-fg-danger-strong">Stokta Yok</span>
              </p>
              {/* buttons */}
              <div className="flex w-full justify-between">
                <Button
                  padding="sm"
                  textSize="sm"
                  variant="secondary"
                  text="Gelince Haber Ver"
                  className="w-full"
                  onClick={() => notifyWhenAvailable?.({
                    productId: 0,
                    userId: 0,
                  })}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
