
export function PaymentSection({ onPrev }: { onPrev: () => void }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-gray-500 text-sm">Adım 3: Ödeme ve Onay</h2>
      
      <div className="bg-[#0d121a] border border-gray-800 rounded-2xl p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-gray-800 pb-4">
          <span className="text-gray-400 text-sm">Hizmet Bedeli</span>
          <span className="font-bold">₺150,00</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-800 pb-4">
          <span className="text-gray-400 text-sm">KDV (%20)</span>
          <span className="font-bold">₺30,00</span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-lg font-bold">Toplam Tutar</span>
          <span className="text-lg font-bold text-cyan-400">₺180,00</span>
        </div>
      </div>

      <div className="flex gap-4 pt-10">
        <button onClick={onPrev} className="px-8 py-2.5 rounded-lg bg-gray-800 text-sm font-semibold hover:bg-gray-700">
          Geri Dön
        </button>
        <button className="flex-1 py-2.5 rounded-lg bg-green-600 text-sm font-bold hover:bg-green-500 transition-all shadow-lg shadow-green-900/20">
          Ödemeyi Tamamla ve Yayınla
        </button>
      </div>
    </div>
  );
}