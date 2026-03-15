"use client";

import { useState } from "react";
import {
  OrderProduct,
  TopupResponsePayload,
} from "@/features/user/user.types";
import { baseFetcher } from "@/lib/api/baseFetcher";
import { handleRequest } from "@/lib/utils";
import { confirmTopup } from "@/features/user/service";

export function useOrderProductStatus(orderId: string, product: OrderProduct) {
  const [copied, setCopied] = useState(false);
  const [codeVisible, setCodeVisible] = useState(false);
  const [topUpSelection, setTopUpSelection] = useState<
    null | "confirmed" | "disputed"
  >(null);
  const [loading, setLoading] = useState(false);

  const maskedCode = product.code ? product.code.replace(/[^\s]/g, "*") : "";

  const handleCopyCode = () => {
    if (!product.code) return;
    navigator.clipboard.writeText(product.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // UI önce güncellenecek ve ardından arka planda API çağrısı yapılacak..
  const handleConfirm = (payload: TopupResponsePayload) => {
    setTopUpSelection("confirmed");

    handleRequest(
      () => confirmTopup(orderId, product.id, payload),
      "Topup durumu güncellendi",
      setLoading,
    );
  };

  const handleDispute = (reason?: string) => {
    setTopUpSelection("disputed");
    baseFetcher(
      `${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}/items/${product.id}/dispute`,
      { method: "POST", body: JSON.stringify({ reason }) },
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
