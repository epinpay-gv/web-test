"use client";
import { XCircle } from "lucide-react";
import Link from "next/link";

export function FailedResult() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in zoom-in-95 duration-500">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full" />
        <img src="/icons/failed-order.png" alt="Failed" className="w-32 h-32 relative z-10" />
      </div>

      <h1 className="text-3xl font-bold text-white mb-3">Ödeme Başarısız</h1>
      <p className="text-gray-400 max-w-sm mx-auto mb-8 font-light leading-relaxed">
        Ödeme işleminiz banka veya sistem kaynaklı bir sorun nedeniyle tamamlanamadı. 
        Lütfen bilgilerinizi kontrol edip tekrar deneyin.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/cart"
          className="px-8 py-3 bg-(--bg-brand) hover:bg-(--bg-brand-strong) text-white rounded-xl font-semibold transition-all"
        >
          Tekrar Dene
        </Link>
        <Link 
          href="/support"
          className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-[#1D303A] transition-all"
        >
          Destek Al
        </Link>
      </div>
    </div>
  );
}