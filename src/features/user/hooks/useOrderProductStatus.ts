"use client";

import { useState } from "react";
import { BffOrderItem } from "@/features/user/user.types";
import { confirmItem, disputeItem, viewEpin } from "@/features/user/user.service";
import { handleRequest } from "@/lib/utils";

export function useOrderProductStatus(orderId: string, product: BffOrderItem) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [codeVisible, setCodeVisible] = useState(false);
  const [epinCodes, setEpinCodes] = useState<string[]>([]);
  const [topUpSelection, setTopUpSelection] = useState<null | "confirmed" | "disputed">(null);
  const [loading, setLoading] = useState(false);

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleViewEpin = async () => {
    try {
      const res = await viewEpin(orderId, product.id) as { epins?: string[] };
      if (res?.epins?.length) setEpinCodes(res.epins);
    } catch (err) {
      console.error("view-epin error:", err);
    }
  };

  const handleConfirm = () => {
    setTopUpSelection("confirmed");
    handleRequest(
      () => confirmItem(orderId, product.id),
      "Teslim alındı olarak işaretlendi",
      setLoading,
    );
  };

  const handleDispute = (reason?: string) => {
    setTopUpSelection("disputed");
    handleRequest(
      () => disputeItem(orderId, product.id, { reason: reason ?? "" }),
      "İtiraz oluşturuldu",
      setLoading,
    );
  };

  return {
    copiedIndex,
    codeVisible,
    setCodeVisible,
    epinCodes,
    topUpSelection,
    loading,
    handleCopyCode,
    handleViewEpin,
    handleConfirm,
    handleDispute,
  };
}
