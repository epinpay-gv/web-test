"use client";

import { useState } from "react";
import { OrderProduct } from "@/features/user/user.types";
import { baseFetcher } from "@/lib/api/baseFetcher";

export function useOrderProductStatus(orderId: string, product: OrderProduct) {
  const [copied, setCopied] = useState(false);
  const [codeVisible, setCodeVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [localProduct] = useState(product);
  const [topUpSelection, setTopUpSelection] = useState<null | "confirmed" | "disputed">(null);

  const maskedCode = localProduct.code ? localProduct.code.replace(/[^\s]/g, "*") : "";

  const handleCopyCode = () => {
    if (!localProduct.code) return;
    navigator.clipboard.writeText(localProduct.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // UI önce güncellenir, ardından arka planda API çağrısı yapılır.
  const handleConfirm = () => {
    setTopUpSelection("confirmed");
    baseFetcher(
      `${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}/items/${localProduct.id}/confirm`,
      { method: "POST" }
    ).catch((err) => console.error("confirm error:", err));
  };

  const handleDispute = (reason?: string) => {
    setTopUpSelection("disputed");
    baseFetcher(
      `${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}/items/${localProduct.id}/dispute`,
      { method: "POST", body: JSON.stringify({ reason }) }
    ).catch((err) => console.error("dispute error:", err));
  };

  const showCodeBox =
    (localProduct.itemType === "NORMAL" || localProduct.itemType === "DROPSHIPPING") &&
    localProduct.status === "COMPLETED" &&
    !!localProduct.code;

  const showTopUpActions =
    localProduct.itemType === "TOP_UP" &&
    (localProduct.status === "DELIVERED" || topUpSelection !== null);

  return {
    product: localProduct,
    copied,
    codeVisible,
    setCodeVisible,
    isLoading,
    maskedCode,
    topUpSelection,
    handleCopyCode,
    handleConfirm,
    handleDispute,
    showCodeBox,
    showTopUpActions,
  };
}