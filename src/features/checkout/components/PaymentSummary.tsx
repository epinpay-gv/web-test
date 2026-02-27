"use client"

import { Button } from "@/components/common";

interface PaymentSummaryProps {
  productCount: number,
  productTotalAmount: number,
  comission: number,
  taxes: number,
  totalAmount: number,
}

export function PaymentSummary({ productCount, productTotalAmount, comission, taxes, totalAmount }: PaymentSummaryProps) {
    const formatPrice = (value: number) => {
        return new Intl.NumberFormat('tr-TR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };
    return(
        <div className="bg-(--bg-neutral-primary-soft) text-(--text-body) font-base leading-6 p-6 border border-[#1D303A] rounded-(--radius-base)">
            <div className="pb-2 flex justify-between border-b border-[#1D303A]">
                {productCount > 1 ?
                    (
                        <p>{productCount} ürün toplamı</p>
                    ) : (
                        <p>Ürün fiyatı</p>
                    )
                }
                <p>₺{formatPrice(productTotalAmount)}</p>
            </div>
            <div className="py-2 flex justify-between border-b border-[#1D303A]">
                <p>Komisyon</p>
                <p>₺{formatPrice(comission)}</p>
            </div>
            <div className="py-2 flex justify-between border-b border-[#1D303A]">
                <p>Vegiler</p>
                <p>₺{formatPrice(taxes)}</p>
            </div>
            <div className="py-2 flex justify-between text-(--text-heading)"> 
                <p>Toplam</p>
                <p>₺{formatPrice(totalAmount)}</p>
            </div>
            <div className="py-2">
                <Button variant="brand" text="Ödemeye Devam Et"/>
            </div>
        </div>
    )
}