"use client";
import { CartPlusAlt } from "flowbite-react-icons/outline";
import { Button } from "@/components/common";
import { AddToCartPayload } from "@/features/catalog/catalog.types";
import { Product } from "@/types/types";
import { useRouter } from "next/navigation";
import { useCatalogStore } from "@/features/catalog/store/catalog.store";
import { getTopupModalData } from "@/features/catalog/catalog.service";

interface ActionButtonsProps {
  isLoading?: boolean;
  product: Product;
  isHorizontal: boolean;
  orientation?: "horizontal" | "vertical";
  addToCart: (payload: AddToCartPayload) => void;
}

export function ActionButtons({
  isLoading = false,
  product,
  isHorizontal,
  orientation = "horizontal",
  addToCart,
}: ActionButtonsProps) {
  const router = useRouter();
  const { openTopupModal, setTopupFields } = useCatalogStore();

  const handleCartAction = async (callback: () => void) => {
    if (product.type?.toLowerCase() === "top-up" || product.type_id === 5) {
      const res = await getTopupModalData(product.id);
      if (res?.data) {
        setTopupFields(res.data);
      }
      openTopupModal(product);
    } else {
      callback();
    }
  };

  if (isLoading) {
    return (
      <div
        className={`flex justify-between gap-2 ${isHorizontal ? "w-50" : ""} ${
          orientation === "horizontal" ? "flex-row" : "flex-col"
        }`}
      >
        {/* Sepete Ekle */}
        <div className="hidden md:block w-full h-10 rounded-md bg-gray-200 shimmer" />

        {/* Icon-only cart button */}
        <div className="block md:hidden w-12 h-10 rounded-md bg-gray-200 shimmer" />

        {/* Hemen Al */}
        <div className="w-full h-10 rounded-md bg-gray-200 shimmer" />
      </div>
    );
  }
  return (
    <div
      className={`flex justify-between gap-2 ${isHorizontal ? "w-50" : ""} ${orientation === "horizontal" ? "flex-row" : "flex-col"}`}
    >
      {product.type_id !== 5 && (
        <Button
          padding="sm"
          textSize="xs"
          variant="secondary"
          text="Sepete Ekle"
          className="hidden md:block w-full font-medium"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleCartAction(() => {
              addToCart?.({
                productId: product.id,
                offerId: product.cheapestOffer?.id || 0,
                quantity: 1,
              });
            });
          }}
        />
      )}
      {product.type_id !== 5 && (
        <Button
          padding="sm"
          textSize="xs"
          variant="secondary"
          icon={<CartPlusAlt />}
          className="block md:hidden max-w-12"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleCartAction(() => {
              addToCart?.({
                productId: product.id,
                offerId: product.cheapestOffer?.id || 0,
                quantity: 1,
              });
            });
          }}
        />
      )}
      <Button
        padding="sm"
        textSize="xs"
        variant="brand"
        text="Hemen Al"
        className="w-full font-medium z-10"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleCartAction(() => {
            addToCart?.({
              productId: product.id,
              offerId: product.cheapestOffer?.id || 0,
              quantity: 1,
            });
            router.push("/checkout");
          });
        }}
      />
    </div>
  );
}
