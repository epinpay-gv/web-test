"use client";
import { Product } from "@/types/types";
import { ProductCardOrientation } from "./types";
import {
  ImageSection,
  ProductInfo,
  PriceSection,
  ActionButtons,
  OutOfStockSection,
  CartActionButtons,
  TopupInfoForm,
} from "./CardSections";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  AddToFavoritesPayload,
  AddToCartPayload,
  NotifyWhenAvailablePayload,
  ChangeQuantityPayload,
} from "@/features/catalog/catalog.types";
import { Modal } from "../../Modal/Modal";
import { useState } from "react";

interface ProductCardProps {
  isLoading?: boolean;
  product: Product;
  orientation?: ProductCardOrientation;
  isInCart?: boolean;
  addToCart: (payload: AddToCartPayload) => void;
  notifyWhenAvailable: (payload: NotifyWhenAvailablePayload) => void;
  addToFavorites: (payload: AddToFavoritesPayload) => void;
  changeQuantity: (payload: ChangeQuantityPayload) => void;
  isReadOnly?: boolean;
  onClose?: () => void;
}

const sizeClasses = {
  vertical: "w-42.5 h-79 md:w-56 md:h-92.5",
  horizontal: {
    default: "w-87 h-39.5 md:w-155.5",
    cart: "w-full h-27.5",
  },
};

export default function ProductCard({
  isLoading = false,
  product,
  orientation = ProductCardOrientation.VERTICAL,
  isInCart = false,
  addToCart,
  notifyWhenAvailable,
  addToFavorites,
  changeQuantity,
  isReadOnly,
  onClose,
}: ProductCardProps) {
  const isHorizontal = orientation === ProductCardOrientation.HORIZONTAL;

  const cardSizeClass = isHorizontal
    ? isInCart
      ? sizeClasses.horizontal.cart
      : sizeClasses.horizontal.default
    : sizeClasses.vertical;

  const cardClasses = cn(
    "gap-1 flex transition-transform duration-200",
    !isInCart
      ? "hover:shadow-[0px_0px_8px_-2px_rgba(255,_255,_255,_0.5)] card-container p-3"
      : "cart-card-container",
    isHorizontal ? "flex-row gap-4" : "flex-col justify-start",
    cardSizeClass,
  );

  const [isOpen, setIsOpen] = useState(false);

  


  const content = (
    <>
      <ImageSection
        isLoading={isLoading}
        product={product}
        isHorizontal={isHorizontal}
        isInCart={isInCart}
        addToFavorites={addToFavorites}
      />

      <div
        className={cn(
          "space-y-1 w-full flex justify-between md:space-y-2",
          isHorizontal
            ? "flex-1 flex flex-col items-start justify-between"
            : "flex flex-col justify-between",
        )}
      >
        <ProductInfo
          product={product}
          isHorizontal={isHorizontal}
          isLoading={isLoading}
        />

        {!isInCart &&
          (product.basePrice ? (
            <>
              <PriceSection product={product} isLoading={isLoading} />
              <ActionButtons
                isHorizontal={isHorizontal}
                addToCart={addToCart}
                product={product}
                isLoading={isLoading}
              />
            </>
          ) : (
            <OutOfStockSection
              isHorizontal={isHorizontal}
              notifyWhenAvailable={notifyWhenAvailable}
            />
          ))}

        {isInCart && (
          <div
            className={
              !isReadOnly
                ? "flex w-full justify-between items-center"
                : "w-full flex justify-end"
            }
          >
            {!isReadOnly && (
              <CartActionButtons
                product={product}
                changeQuantity={changeQuantity}
              />
            )}
            <PriceSection product={product} />
          </div>
        )}
      </div>
      {isOpen && onClose && (
        <Modal
          open={isOpen}
          onClose={onClose}
          title={"Bilgilerini Gir"}
          theme="info"
          size="md"
        >
          <TopupInfoForm />
        </Modal>
      )}
    </>
  );

  if (isInCart) {
    return <div className={cardClasses}>{content}</div>;
  }

  const productHref = `/${product.translation.category_slug}/${product.translation.slug}`;

  return (
    <Link href={productHref} className={cardClasses}>
      {content}
    </Link>
  );
}
