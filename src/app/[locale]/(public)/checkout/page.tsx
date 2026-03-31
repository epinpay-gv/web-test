'use client';
import { EmptyCart } from '@/features/checkout/components/EmptyCart';
import { FilledCart } from '@/features/checkout/components/FilledCart';
import { PaymentCart } from '@/features/checkout/components/PaymentCart';
import { useCart } from '@/features/checkout/hooks/useCart';
import { useState } from 'react';

export default function CartPage() {
  const { items, totalPrice, step, setStep, isLoading, updateQuantity, removeItem, resetCart  } = useCart();
  const [wantsInvoice, setWantsInvoice] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute max-lg:hidden w-193.5 h-166 -right-60.5 -bottom-15 bg-[#4FA9E2] opacity-20 blur-[229px] z-0 pointer-events-none overflow-hidden" />      
      <div className=" mx-auto pb-20 relative ">
        {items.length === 0 ? (
          <EmptyCart onResetCart={resetCart} />
        ) : (
          <div className="text-white">
            {step === "items" &&
              <FilledCart 
                items={items} 
                totalPrice={totalPrice} 
                step={step}              
                onQuantityChange={updateQuantity}
                onStepChange={(nextStep, invoicePreference) => {
                  if (invoicePreference !== undefined) setWantsInvoice(invoicePreference);
                  setStep(nextStep);
                }}
                onRemoveItem={removeItem}
              />
            }
            {step === "delivery" &&
              <PaymentCart 
                totalPrice={totalPrice} 
                initialWantsInvoice={wantsInvoice} 
                currentStep={step}
              />
            } 
          </div>
        )}
      </div>
    </div>
  );
}
