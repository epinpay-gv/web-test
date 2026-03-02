"use client";

import { useState } from "react";
import { OrderProduct } from "@/features/user/user.types";
import { baseFetcher } from "@/lib/api/baseFetcher";

export function useOrderProductStatus(orderId: string, product: OrderProduct) {
  const [copied, setCopied] = useState(false);
  const [codeVisible, setCodeVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localProduct, setLocalProduct] = useState(product);

  const maskedCode = localProduct.code ? localProduct.code.replace(/[^\s]/g, "*") : "";

  const handleCopyCode = () => {
    if (!localProduct.code) return;
    navigator.clipboard.writeText(localProduct.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleViewEpin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await baseFetcher<{ epins: string[]; already_viewed: boolean }>(
        `${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}/items/${localProduct.id}/view-epin`,
        { method: "POST" }
      );
      if (res.epins && res.epins.length > 0) {
        setLocalProduct((prev) => ({
          ...prev,
          code: res.epins.join(", "),
          status: "COMPLETED",
        }));
        setCodeVisible(true);
      }
    } catch (err) {
      setError("EPIN kodu alınamadı.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await baseFetcher(
        `${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}/items/${localProduct.id}/confirm`,
        { method: "POST" }
      );
      setLocalProduct((prev) => ({ ...prev, status: "COMPLETED" }));
    } catch (err) {
      setError("Onay işlemi başarısız oldu.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDispute = async (reason?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await baseFetcher(
        `${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}/items/${localProduct.id}/dispute`,
        {
          method: "POST",
          body: JSON.stringify({ reason })
        }
      );
      setLocalProduct((prev) => ({ ...prev, status: "DISPUTED" }));
    } catch (err) {
      setError("İtiraz işlemi başarısız oldu.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const showViewEpinButton =
    (localProduct.itemType === "NORMAL" || localProduct.itemType === "DROPSHIPPING") &&
    localProduct.status === "EPIN_READY";

  const showCodeBox =
    localProduct.status === "COMPLETED" &&
    (localProduct.itemType === "NORMAL" || localProduct.itemType === "DROPSHIPPING") &&
    !!localProduct.code;

  const showTopUpActions =
    localProduct.itemType === "TOP_UP" &&
    localProduct.status === "DELIVERED";

  const showWaitingMessage =
    (localProduct.itemType === "DROPSHIPPING" || localProduct.itemType === "TOP_UP") &&
    localProduct.status === "AWAITING_DELIVERY";

  return {
    product: localProduct,
    copied,
    codeVisible,
    setCodeVisible,
    isLoading,
    error,
    maskedCode,
    handleCopyCode,
    handleViewEpin,
    handleConfirm,
    handleDispute,
    showViewEpinButton,
    showCodeBox,
    showTopUpActions,
    showWaitingMessage,
  };
}