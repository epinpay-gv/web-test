"use client";
import { Button, CheckBox, Input } from "@/components/common";
import { Envelope } from "flowbite-react-icons/outline";
import { DiscountCodeForm } from "./DiscountCodeForm";

interface OrderSummaryProps {
  totalPrice: number;
  onNext: () => void;
}

export function OrderSummary({ totalPrice, onNext }: OrderSummaryProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 p-6 bg-(--bg-neutral-primary-soft) border border-(--border-default) rounded-(--radius-base)">      

        {/* Avantajlar Kutusu */}
        <div className="flex flex-col gap-4 border-b border-(--border-default) pb-4 ">
          <p className="text-(--text-heading) text-sm  mb-2">E-posta adresinizi girin. Siparişinizi göndermek için e-posta adresinize ihtiyacımız var.</p>
          <Input placeholder="Email adresinizi girin" leftIcon={<Envelope size={16}/>} rightIcon={<></>}/>
          <div>
            <CheckBox label="Bu mail ile hesap oluştur. Avantajlardan faydalan"/>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-(--text-heading) text-sm font-medium">Üyelik avantajları</span>
            <ul className="text-(--text-fg-brand) text-xs space-y-2 list-disc list-inside">
              <li>Siparişlerinizi takip edin</li>
              <li>Her alışverişte Ep Puan kazanın</li>
              <li>Desteğe erişin ve satıcılarla kolay iletişim kurun</li>
            </ul>
          </div>
        </div>

        {/* Ödeme Kutusu */}
        <div className="">
          <div className="flex justify-between items-center mb-6">
            <span className="text-(--text-heading) font-medium">Toplam</span>
            <span className="text-(--text-heading) font-medium">₺{totalPrice}</span>
          </div>
          
          <Button
            variant="brand"
            text="Ödemeye Devam Et"          
            onClick={onNext}
            />

          <div className="mt-4 flex gap-2 items-start">        
            <div className="flex items-start gap-1">
              <CheckBox /> 
              <p className="text-xs">Ödemeye Devam Et butonuna tıklayarak Mesafeli Satış Sözleşmesini ve İade ve İptal Koşullarını okuduğumu ve kabul ettiğimi onaylıyorum.</p>
            </div>
          </div>
        </div>

      </div>
        {/* İndirim Kodu */}
        <div className="p-6 bg-(--bg-neutral-primary-soft) border border-(--border-default) rounded-(--radius-base)">
          <DiscountCodeForm />
        </div>
    </div>
  );
}