"use client";

import { useState } from "react";
import { OrderProduct } from "@/features/user/user.types";
import { baseFetcher } from "@/lib/api/baseFetcher";

export function useOrderProductStatus(orderId: string, product: OrderProduct) {
  const [copied, setCopied] = useState(false);
  const [codeVisible, setCodeVisible] = useState(false);
  const [topUpSelection, setTopUpSelection] = useState<null | "confirmed" | "disputed">(null);

  const maskedCode = product.code ? product.code.replace(/[^\s]/g, "*") : "";

  const handleCopyCode = () => {
    if (!product.code) return;
    navigator.clipboard.writeText(product.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // UI önce güncellenir, ardından arka planda API çağrısı yapılır.
  const handleConfirm = () => {
    setTopUpSelection("confirmed");
    baseFetcher(
      `${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}/items/${product.id}/confirm`,
      { method: "POST" }
    ).catch((err) => console.error("confirm error:", err));
  };

  const handleDispute = (reason?: string) => {
    setTopUpSelection("disputed");
    baseFetcher(
      `${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}/items/${product.id}/dispute`,
      { method: "POST", body: JSON.stringify({ reason }) }
    ).catch((err) => console.error("dispute error:", err));
  };

  const showCodeBox =
    (product.itemType === "NORMAL" || product.itemType === "DROPSHIPPING") &&
    product.status === "COMPLETED" &&
    !!product.code;

  const showTopUpActions =
    product.itemType === "TOP_UP" &&
    (product.status === "DELIVERED" || topUpSelection !== null);

  return {
    product: product,
    copied,
    codeVisible,
    setCodeVisible,
    maskedCode,
    topUpSelection,
    handleCopyCode,
    handleConfirm,
    handleDispute,
    showCodeBox,
    showTopUpActions,
  };
}