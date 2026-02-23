/* eslint-disable @typescript-eslint/no-explicit-any */
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
  onQuantityChange: (id: string, q: number) => void;
}

export function FilledCart({ items, totalPrice, step, onStepChange, onQuantityChange }: FilledCartProps) {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <CartStepper currentStep={step} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        <div className="lg:col-span-2 space-y-6">        

          <div className="flex flex-col gap-4">
            {items.map((item) => (
                <div key={item.id} className="bg-(--bg-neutral-primary-soft) border rounded-(--radius-base) border-[#1D303A] p-6">
                    <ProductCard                        
                        product={{
                            id: item.id,
                            basePrice: item.price,
                            image: item.image,
                            translation: { name: item.name, slug: "#", category_slug: "#" }
                        } as any}
                        orientation={ProductCardOrientation.HORIZONTAL}
                        isInCart={true}
                        changeQuantity={(p) => onQuantityChange(item.id, 100)}
                        addToCart={() => {}}
                        notifyWhenAvailable={() => {}}
                        addToFavorites={() => {}}
                    />
                </div>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-28">
            <OrderSummary 
              totalPrice={totalPrice} 
              onNext={() => onStepChange('delivery')} 
            />
          </div>
        </aside>
      </div>
    </div>
  );
}