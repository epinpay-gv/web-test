"use client";
import { useState, useCallback } from "react";
import ProductCard from "@/components/common/Cards/ProductCard/ProductCard";
import { ProductCardOrientation } from "@/components/common/Cards/ProductCard/types";
import { CartItem, CartStep } from "../types";
import { CartSummary } from "./CartSummary";
import { CartStepper } from "./CartStepper";
import { OutOfStockModal } from "./OutOfStockModal";

interface FilledCartProps {
  items: CartItem[];
  totalPrice: number;
  step: CartStep;
  onStepChange: (step: CartStep, wantsInvoice: boolean) => void;
  onQuantityChange: (
    id: string,
    newQuantity: number,
    currentQuantity: number,
  ) => void;
  onRemoveItem: (id: string) => void;
  onResetCart?: () => void;
}

interface OutOfStockModalState {
  isOpen: boolean;
  products: CartItem[];
}

const INITIAL_MODAL_STATE: OutOfStockModalState = {
  isOpen: false,
  products: [],
};

export function FilledCart({
  items,
  totalPrice,
  step,
  onStepChange,
  onQuantityChange,
  onRemoveItem,
}: FilledCartProps) {
  const [outOfStockModal, setOutOfStockModal] =
    useState<OutOfStockModalState>(INITIAL_MODAL_STATE);

  const noop = () => {};

  const openOutOfStockModal = useCallback((outOfStockItems: CartItem[]) => {
    setOutOfStockModal({ isOpen: true, products: outOfStockItems });
  }, []);

  const handleModalClose = useCallback(() => {
    setOutOfStockModal(INITIAL_MODAL_STATE);
  }, []);

  const handleRemoveOne = useCallback(
    (id: string) => {
      onRemoveItem(id);
      setOutOfStockModal((prev) => {
        const remaining = prev.products.filter((p) => p.offerId !== id);
        return remaining.length > 0
          ? { isOpen: true, products: remaining }
          : INITIAL_MODAL_STATE;
      });
    },
    [onRemoveItem],
  );

  const handleRemoveAll = useCallback(() => {
    outOfStockModal.products.forEach((p) => onRemoveItem(p.offerId));
    setOutOfStockModal(INITIAL_MODAL_STATE);
  }, [onRemoveItem, outOfStockModal.products]);

  const handleBeforeNext = useCallback((): boolean => {
    const outOfStockItems = items.filter((item) => !item.basePrice);
    if (outOfStockItems.length > 0) {
      openOutOfStockModal(outOfStockItems);
      return false;
    }
    return true;
  }, [items, openOutOfStockModal]);

  return (
    <div className="mx-auto animate-in relative fade-in duration-500">
      <CartStepper currentStep={step} />
      <div className="max-w-5xl p-4 md:p-0 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:mt-10">
          <div className="md:col-span-3 space-y-4">
            <div className="flex flex-col gap-4">
              {items.map((item, index) =>  
                  <div
                    key={index}
                    className="p-6 bg-(--bg-neutral-primary-soft) border rounded-(--radius-base) border-[#1D303A] overflow-hidden"
                  >
                    <ProductCard
                      product={item}
                      orientation={ProductCardOrientation.HORIZONTAL}
                      isInCart={true}
                      changeQuantity={(p) => {
                        if (p.action === "remove") {
                          onRemoveItem(item.offerId);
                        } else {
                          onQuantityChange(
                            item.offerId,
                            p.quantity,
                            item.quantity,
                          );
                        }
                      }}
                      addToCart={noop}
                      notifyWhenAvailable={noop}
                      addToFavorites={noop}
                    />
                  </div>
              )}
            </div>
          </div>

          <aside className="md:col-span-2">
            <div className="lg:sticky lg:top-28">
              <CartSummary
                totalPrice={totalPrice}
                onBeforeNext={handleBeforeNext}
                onNext={(wantsInvoice) =>
                  onStepChange("delivery", wantsInvoice)
                }
              />
            </div>
          </aside>
        </div>
      </div>

      {outOfStockModal.products.length > 0 && (
        <OutOfStockModal
          isOpen={outOfStockModal.isOpen}
          products={outOfStockModal.products}
          onRemove={handleRemoveOne}
          onRemoveAll={handleRemoveAll}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
