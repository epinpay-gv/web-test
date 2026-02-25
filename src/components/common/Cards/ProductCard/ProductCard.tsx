"use client";
import React, { ElementType } from "react"; // React eklendi
import { Product } from "@/types/types";
import { ProductCardOrientation } from "./types";
import {
  ImageSection,
  ProductInfo,
  PriceSection,
  ActionButtons,
  OutOfStockSection,
  CartActionButtons,
} from "./CardSections";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  AddToFavoritesPayload,
  AddToCartPayload,
  NotifyWhenAvailablePayload,
  ChangeQuantityPayload,
} from "@/features/catalog/catalog.types";

interface ProductCardProps {
  product: Product;
  orientation?: ProductCardOrientation;
  isInCart?: boolean;
  addToCart: (payload: AddToCartPayload) => void;
  notifyWhenAvailable: (payload: NotifyWhenAvailablePayload) => void;
  addToFavorites: (payload: AddToFavoritesPayload) => void;
  changeQuantity: (payload: ChangeQuantityPayload) => void;
}

const sizeClasses = {
  vertical: "w-42.5 h-79 md:w-56 md:h-92.5",
  horizontal: {
    default: "w-87 h-39.5 md:w-155.5",
    cart: "w-full h-27.5",
  },
};

export default function ProductCard({
  product,
  orientation = ProductCardOrientation.VERTICAL,
  isInCart = false,
  addToCart,
  notifyWhenAvailable,
  addToFavorites,
  changeQuantity,
}: ProductCardProps) {
  const isHorizontal = orientation === ProductCardOrientation.HORIZONTAL;
  const Component: ElementType = isInCart ? "div" : Link;
  
  const cardSizeClass = isHorizontal
    ? isInCart
      ? sizeClasses.horizontal.cart
      : sizeClasses.horizontal.default
    : sizeClasses.vertical;

  const cardContentSizeClass = isHorizontal
    ? "flex-1 flex flex-col items-start justify-between"
    : "flex flex-col justify-between";

  const productHref = `/${product.translation.category_slug}/${product.translation.slug}`;

  // Link veya Div için gerekli proplar
  const componentProps = !isInCart ? { href: productHref } : {};

  return (
    <Component
      {...componentProps}
      className={cn(
        "gap-1 flex transition-transform duration-200",
        !isInCart ? "hover:scale-102 card-container p-3" : "cart-card-container",
        isHorizontal ? "flex-row gap-4" : "flex-col justify-start",
        cardSizeClass
      )}
    >
      {/* Image Section */}
      <ImageSection
        product={product}
        isHorizontal={isHorizontal}
        isInCart={isInCart}
        addToFavorites={addToFavorites}
      />

      {/* Content Section */}
      <div className={cn("space-y-1 w-full flex justify-between md:space-y-2", cardContentSizeClass)}>        
        <ProductInfo 
            product={product} 
            isHorizontal={isHorizontal} 
        />

        {!isInCart && (
          product.basePrice ? (
            <>
              <PriceSection product={product} />
              <ActionButtons
                isHorizontal={isHorizontal}
                addToCart={addToCart}
                product={product}
              />
            </>
          ) : (
            <OutOfStockSection
              isHorizontal={isHorizontal}
              notifyWhenAvailable={notifyWhenAvailable}
            />
          )
        )}

        {isInCart && (
          <div className="flex w-full justify-between items-center">
            <CartActionButtons
              product={product}
              changeQuantity={changeQuantity}
            />
            <PriceSection product={product} />
          </div>
        )}
      </div>
    </Component>
  );
}