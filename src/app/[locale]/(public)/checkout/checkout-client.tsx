"use client";
import { EmptyCart } from "@/features/checkout/components/EmptyCart";
import { FilledCart } from "@/features/checkout/components/FilledCart";
import { PaymentCart } from "@/features/checkout/components/PaymentCart";
import { useCart } from "@/features/checkout/hooks/useCart";
import { useState } from "react";

export function CheckoutClient() {
  const {
    items,
    totalPrice,
    step,
    setStep,
    isLoading,
    updateQuantity,
    removeItem,
    resetCart,
  } = useCart();

  const [wantsInvoice, setWantsInvoice] = useState(false);

  if (isLoading) return null; // TODO : skeleton eklenecek

  return (
    <>
      {items.length === 0 ? (
        <EmptyCart onResetCart={resetCart} />
      ) : (
        <div className="text-white">
          {step === "items" && (
            <FilledCart
              items={items}
              totalPrice={totalPrice}
              step={step}
              onQuantityChange={updateQuantity}
              onStepChange={(nextStep, invoicePreference) => {
                if (invoicePreference !== undefined)
                  setWantsInvoice(invoicePreference);
                setStep(nextStep);
              }}
              onRemoveItem={removeItem}
            />
          )}
          {step === "delivery" && (
            <PaymentCart
              totalPrice={totalPrice}
              initialWantsInvoice={wantsInvoice}
              currentStep={step}
            />
          )}
        </div>
      )}
    </>
  );
}
