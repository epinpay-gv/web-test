"use client";
import { Product } from "@/types/types";
import {
  AddToCartPayload,
  NotifyWhenAvailablePayload,
  ProductCardOrientation,
} from "./types";
import { ImageSection, ProductInfo, PriceSection, ActionButtons, OutOfStockSection } from "./CardSections";
interface ProductCardProps {
  product: Product;
  orientation?: ProductCardOrientation;
  addToCart: (payload: AddToCartPayload) => void;
  notifyWhenAvailable: (payload: NotifyWhenAvailablePayload) => void;
  addToFavorites: (payload: NotifyWhenAvailablePayload) => void;
}

export function ProductCard({
  product,
  orientation = ProductCardOrientation.VERTICAL,
  addToCart,
  notifyWhenAvailable,
  addToFavorites,
}: ProductCardProps) {
  const isHorizontal = orientation === ProductCardOrientation.HORIZONTAL;

  return (
    <div
      className={`product-card-container p-3 gap-1 flex ${
        isHorizontal ? 'flex-row gap-4' : 'flex-col justify-start'
      } ${isHorizontal ? 'w-155.5 h-39.5' : 'w-42.5 h-79 md:w-56 md:h-92.5'}`}
    >
      {/* Image Section */}
      <ImageSection product={product} isHorizontal={isHorizontal} addToFavorites={addToFavorites} />

      {/* Content Section */}
      <div className={` space-y-2 ${isHorizontal ? 'flex-1 flex flex-col items-start' : 'flex flex-col justify-between'}`}>
        <ProductInfo product={product} isHorizontal={isHorizontal}/>
        
        {product.basePrice ? (
          <>
            <PriceSection product={product} />
            <ActionButtons addToCart={addToCart} />
          </>
        ) : (
          <OutOfStockSection notifyWhenAvailable={notifyWhenAvailable} />
        )}
      </div>
    </div>
  );
}
