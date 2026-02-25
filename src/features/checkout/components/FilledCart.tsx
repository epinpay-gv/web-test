// features/cart/components/FilledCart.tsx
"use client";

import ProductCard from "@/components/common/Cards/ProductCard/ProductCard";
import { ProductCardOrientation } from "@/components/common/Cards/ProductCard/types";
import { CartItem, CartStep } from "../types";
import { OrderSummary } from "./OrderSummary";
import { CartStepper } from "./CartStepper";

interface FilledCartProps {
  items: CartItem[];
  totalPrice: number;
  step: CartStep;
  onStepChange: (step: CartStep) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

export function FilledCart({ 
  items, 
  totalPrice, 
  step, 
  onStepChange, 
  onQuantityChange 
}: FilledCartProps) {    
  const noop = () => {};

  return (
    <div className=" mx-auto animate-in fade-in duration-500">
      <CartStepper currentStep={step} />
      <div className="max-w-5xl p-4 md:p-0 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:mt-10">
          <div className="md:col-span-3 space-y-4">        

            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="p-6 bg-(--bg-neutral-primary-soft) border rounded-(--radius-base) border-[#1D303A] overflow-hidden"
                >
                
                  {/* TODO: Mağazalar aktif olduğunda eklenecek */}
                  {/* <div className="border-b mb-3 p-2 border-[#1D303A]">
                    <p className="text-(--text-body) text-sm">
                      Satıcı <span className="text-(--text-heading)">Epinpay</span>
                    </p>
                  </div> */}
                  <ProductCard
                    product={item} 
                    orientation={ProductCardOrientation.HORIZONTAL}
                    isInCart={true}
                    changeQuantity={(p) => onQuantityChange(String(item.id), p.quantity)}
                    addToCart={noop}
                    notifyWhenAvailable={noop}
                    addToFavorites={noop}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* SAĞ: Özet */}
          <aside className="md:col-span-2">
            <div className="sticky top-28">
              <OrderSummary 
                totalPrice={totalPrice} 
                onNext={() => onStepChange('delivery')} 
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}