"use client";
import { use } from "react";
import { SuccessResult } from "@/features/checkout/components/SuccessResult";
import { FailedResult } from "@/features/checkout/components/FailedResult";
import { ResultType } from "@/features/checkout/types";

interface PageProps {
  params: Promise<{ result: string }>;
  searchParams: Promise<{ order_id?: string }>;
}

export default function ResultPage({ params, searchParams }: PageProps) {
  const resolvedParams = use(params);
  const resolvedSearchParams = use(searchParams);
  const result = resolvedParams.result as ResultType;
  const orderId = resolvedSearchParams.order_id;
  if (!orderId && result === "success") {
    return <div className="text-white text-center py-20">Sipariş numarası bulunamadı.</div>;
  }

  return (
    <div className="min-h-screen bg-(--bg-neutral-primary-soft) relative overflow-hidden">
      <div className="absolute max-lg:hidden w-193.5 h-166 -right-60.5 -bottom-15 bg-[#4FA9E2] opacity-20 blur-[229px] z-0 pointer-events-none overflow-hidden" />  
      <div className="max-w-5xl mx-auto">
        {orderId}
        {result === "success" ? (
          <SuccessResult orderId={orderId!} />
        ) : (
          <FailedResult />
        )}
      </div>
    </div>
  );
}
