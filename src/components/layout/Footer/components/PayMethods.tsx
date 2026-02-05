"use client"

import Image from "next/image"
import React from "react"

export const PayMethods = () => {
  const methods = [
    { name: "PayPal", image: "/paypal.png", width: 63, height: 16 },
    { name: "Visa", image: "/visa.png", width: 49, height: 16 },
    { name: "GPay", image: "/google-pay.png", width: 40, height: 16 },
    { name: "ApplePay", image: "/apple-pay.png", width: 39, height: 16 },
    { name: "MasterCard", image: "/mastercard.png", width: 21, height: 16 },
  ]

  return (
    <div className="bg-(--bg-brand-soft) py-4 h-18 relative overflow-hidden">
      <div className="absolute max-lg:hidden w-193.5 h-166 -left-60.5 -top-76 bg-(--bg-neutral-primary-soft) opacity-20 blur-[458px] z-1 pointer-events-none" />
      
      <div className="container mx-auto px-4 flex md:flex-wrap justify-center items-center gap-4 relative z-10">
        {methods.map((method) => (
          <div 
            key={method.name} 
            className="bg-(--bg-white) rounded px-3 py-1 h-10 flex items-center justify-center min-w-15"
          >
            <Image src={"/image/footer/paymethods"+method.image} width={method.width} height={method.height} alt={method.name} className="h-4 object-cover" />
          </div>
        ))}
        <span className="dark:text-white text-black text-xs font-medium">+200 <br /> ödeme yöntemi</span>
      </div>
    </div>
  )
}/* Vector */