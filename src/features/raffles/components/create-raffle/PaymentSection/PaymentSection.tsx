"use client";
import React, { useState, useMemo } from "react";
import { RaffleFormData } from "../../../raffle.types";
import ProductCard from "@/components/common/Cards/ProductCard/ProductCard";
import { ProductCardOrientation } from "@/components/common/Cards/ProductCard/types";
import { CartItem } from "@/features/checkout/types";
import { RaffleCheckoutSummary } from "./RaffleCheckoutSummary";
import { PaymentMethodSelection } from "./PaymentMethodSelection";

interface PaymentSectionProps {
  data: RaffleFormData;
  onPrev: () => void;
}

type SubStep = "review" | "payment";

export function PaymentSection({ data, onPrev }: PaymentSectionProps) {
  const [subStep, setSubStep] = useState<SubStep>("review");
  const [checkoutData, setCheckoutData] = useState({
    discount: 0,
    wantsInvoice: false
  });

  const noop = () => {};

  const cartItems = useMemo<CartItem[]>(() => {
    return data.prizes.map((p) => {      
      const item = {
        id: p.id,
        offerId: p.id,
        name: p.name,
        slug: "",
        unitPrice: p.price || 0,
        totalPrice: (p.price || 0) * p.count,
        quantity: p.count,
        basePrice: p.price || 0,
        translation: { 
          name: p.name, 
          imgUrl: p.image 
        },        
        seller: "Raffle Prize", 
      };
      return item as unknown as CartItem;
    });
  }, [data.prizes]);

  const handleConfirmReview = (discount: number, wantsInvoice: boolean) => {
    setCheckoutData({ discount, wantsInvoice });
    setSubStep("payment");
  };

  return (
    <div className="mx-auto animate-in relative fade-in duration-500 w-full">      
      <div className="max-w-7xl mx-auto px-4">
        {subStep === "review" ? (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-10">
            <div className="lg:col-span-3 space-y-4">              
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-6 bg-(--bg-neutral-primary-soft) border rounded-(--radius-base) border-[#1D303A]"
                >
                  <ProductCard
                    product={item}
                    orientation={ProductCardOrientation.HORIZONTAL}
                    isInCart={true}                    
                    changeQuantity={noop}
                    addToCart={noop}
                    notifyWhenAvailable={noop}
                    addToFavorites={noop}
                  />
                </div>
              ))}
              <button
                onClick={onPrev}
                className="text-sm text-(--text-body) hover:text-(--text-heading) underline"
              >
                Ödül bilgilerine geri dön
              </button>
            </div>

            <aside className="lg:col-span-2">
              <div className="lg:sticky lg:top-28">
                <RaffleCheckoutSummary 
                  totalPrice={data.amount} 
                  onConfirm={handleConfirmReview} 
                />
              </div>
            </aside>
          </div>
        ) : (
          <div className="mt-10">
            <PaymentMethodSelection 
              data={data} 
              discount={checkoutData.discount}
              wantsInvoice={checkoutData.wantsInvoice}
              onBack={() => setSubStep("review")} 
            />
          </div>
        )}
      </div>
    </div>
  );
}