"use client";
import { Button } from "@/components/common";

interface OrderSummaryProps {
  totalPrice: number;
  onNext: () => void;
}

export function OrderSummary({ totalPrice, onNext }: OrderSummaryProps) {
  return (
    <div className="space-y-4">
      {/* Avantajlar Kutusu */}
      <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-4">
        <h4 className="text-cyan-400 text-sm font-bold mb-2">Üyelik avantajları</h4>
        <ul className="text-gray-400 text-xs space-y-2 list-disc list-inside">
          <li>Siparişlerinizi takip edin</li>
          <li>Her alışverişte <span className="text-white">Ep Puan</span> kazanın</li>
          <li>Desteğe erişin ve satıcılarla kolay iletişim kurun</li>
        </ul>
      </div>

      {/* Ödeme Kutusu */}
      <div className="bg-[#0b1219] border border-gray-800 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-400 font-medium">Toplam</span>
          <span className="text-white text-2xl font-black">₺{totalPrice}</span>
        </div>
        
        <Button
          variant="brand"
          text="Ödemeye Devam Et"
          className="w-full py-4 rounded-xl font-bold"
          onClick={onNext}
        />

        <div className="mt-4 flex gap-2 items-start">
          <input type="checkbox" className="mt-1 accent-cyan-400" id="terms" />
          <label htmlFor="terms" className="text-[10px] text-gray-500 leading-tight">
            Ödemeye Devam Et butonuna tıklayarak <span className="text-cyan-400 underline">Mesafeli Satış Sözleşmesini</span> ve 
            <span className="text-cyan-400 underline"> İptal Koşullarını</span> okuduğumu onaylıyorum.
          </label>
        </div>
      </div>

      {/* İndirim Kodu */}
      <div className="bg-[#0b1219] border border-gray-800 rounded-2xl p-2 flex gap-2">
        <input 
          placeholder="İndirim kodu" 
          className="bg-transparent border-none focus:ring-0 text-sm px-3 flex-1 text-white"
        />
        <Button variant="brand" text="Onayla" className="px-6 py-2 rounded-lg text-xs" />
      </div>
    </div>
  );
}