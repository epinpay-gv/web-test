"use client";
import { Product } from "@/types/types";
import {
  AddToCartPayload,
  ChangeQuantityPayload,
  NotifyWhenAvailablePayload,
  ProductCardOrientation,
} from "./types";
import {
  ImageSection,
  ProductInfo,
  PriceSection,
  ActionButtons,
  OutOfStockSection,
  CartActionButtons,
} from "./CardSections";
interface ProductCardProps {
  product: Product;
  orientation?: ProductCardOrientation;
  isInCart?: boolean;
  addToCart: (payload: AddToCartPayload) => void;
  notifyWhenAvailable: (payload: NotifyWhenAvailablePayload) => void;
  addToFavorites: (payload: NotifyWhenAvailablePayload) => void;
  changeQuantity: (payload: ChangeQuantityPayload) => void;
}

const sizeClasses = {
  vertical: "w-42.5 h-79 md:w-56 md:h-92.5",
  horizontal: {
    default: "w-87 h-39.5 md:w-155.5",
    cart: "w-87 md:w-141.5 h-27.5",
  },
};

export function ProductCard({
  product,
  orientation = ProductCardOrientation.VERTICAL,
  isInCart = false,
  addToCart,
  notifyWhenAvailable,
  addToFavorites,
  changeQuantity,
}: ProductCardProps) {
  const isHorizontal = orientation === ProductCardOrientation.HORIZONTAL;

  const cardSizeClass = isHorizontal
    ? isInCart
      ? sizeClasses.horizontal.cart
      : sizeClasses.horizontal.default
    : sizeClasses.vertical;

  const cardContentSizeClass = isHorizontal
    ? "flex-1 flex flex-col items-start"
    : "flex flex-col justify-between";

  return (
    <div
      className={`gap-1 flex ${isInCart ? "cart-card-container" : "product-card-container p-3"} ${
        isHorizontal ? "flex-row gap-4" : "flex-col justify-start"
      } ${cardSizeClass}`}
    >
      {/* Image Section */}
      <ImageSection
        product={product}
        isHorizontal={isHorizontal}
        isInCart={isInCart}
        addToFavorites={addToFavorites}
      />

      {/* Content Section */}
      <div className={`space-y-1 md:space-y-2 ${cardContentSizeClass}`}>
        <ProductInfo product={product} isHorizontal={isHorizontal} />

        {!isInCart &&
          (product.basePrice ? (
            <>
              <PriceSection product={product} />
              <ActionButtons
                isHorizontal={isHorizontal}
                addToCart={addToCart}
              />
            </>
          ) : (
            <OutOfStockSection isHorizontal={isHorizontal} notifyWhenAvailable={notifyWhenAvailable} />
          ))}

        {isInCart && (
          <div className="flex">
            <CartActionButtons
              product={product}
              changeQuantity={changeQuantity}
            />
            <PriceSection product={product} />
          </div>
        )}
      </div>
    </div>
  );
}
