"use client";

import { Modal, BottomSheet, Button } from "@/components/common";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import ProductCard from "@/components/common/Cards/ProductCard/ProductCard";
import { ProductCardOrientation } from "@/components/common/Cards/ProductCard/types";
import { CartItem } from "../types";

interface OutOfStockModalProps {
  isOpen: boolean;
  products: CartItem[];  // tekil değil, liste
  onRemove: (id: string) => void;  // hangi ürünün silineceğini belirt
  onRemoveAll: () => void;          // tümünü sil
  onClose: () => void;
}

const noop = () => {};

function OutOfStockContent({
  products,
  onRemove,
  onRemoveAll,
  onClose,
  type,
}: Omit<OutOfStockModalProps, "isOpen"> & { type: "modal" | "bottomSheet" }) {
  return (
    <div className={cn("flex flex-col pb-4", type === "bottomSheet" ? "px-4 pb-6 pt-4" : "px-0")}>
      {/* Açıklama */}
      <p className={cn("text-(--text-body) text-sm", type === "modal" ? "-mt-3" : "mt-1")}>
        Malesef, aşağıdaki ürünlerin stoğu tükendi.
      </p>
        {type === "modal" ?
            <div className="mt-4 border-b border-[#1D303A] w-full" />
            : <></>
        }      
      
      <div className="flex flex-col max-h-80 overflow-y-auto mt-4 custom-scrollbar">
        {products.map((product, index) => (
          <div key={product.id}>
            <div className="flex items-center gap-2 py-1">
              <div className="flex-1">
                <ProductCard
                  product={product}
                  orientation={ProductCardOrientation.HORIZONTAL}
                  isInCart={true}
                  isReadOnly={true}
                  addToCart={noop}
                  notifyWhenAvailable={noop}
                  addToFavorites={noop}
                  changeQuantity={noop}
                />
              </div>             
            </div>
            {index < products.length -1 && (
              <div className="border-b border-[#1D303A] w-full" />
            )}
          </div>
        ))}
      </div>      
      <div className={cn("flex gap-3 mt-4", type === "bottomSheet" ? "flex-col" : "")}>
        <Button
          onClick={onClose}
          text="Geri Dön"
          variant="secondary"
          padding="sm"
          className="h-10"
        />
        <Button
          onClick={onRemoveAll}
          text={products.length > 1 ? "Tümünü Sepetten Sil" : "Ürünü Sepetten Sil"}
          variant="brand"
          className="h-10"
        />                
      </div>
    </div>
  );
}

export function OutOfStockModal({
  isOpen,
  products,
  onRemove,
  onRemoveAll,
  onClose,
}: OutOfStockModalProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isOpen || products.length === 0) return null;

  const title =
    products.length > 1
      ? "Sepetinizi gözden geçirin"
      : "Sepetinizi gözden geçirin";

  if (isMobile) {
    return (
      <BottomSheet isOpen={isOpen} onClose={onClose} title={title}>
        <OutOfStockContent
          products={products}
          onRemove={onRemove}
          onRemoveAll={onRemoveAll}
          onClose={onClose}
          type="bottomSheet"
        />
      </BottomSheet>
    );
  }

  return (
    <Modal open={isOpen} onClose={onClose} title={title} theme="info" size="md">
      <OutOfStockContent
        products={products}
        onRemove={onRemove}
        onRemoveAll={onRemoveAll}
        onClose={onClose}
        type="modal"
      />
    </Modal>
  );
}