"use client";

import { useState } from "react";
import { OrderProduct } from "@/features/user/user.types";

type DeliveryState = "pending" | "delivered" | "not_delivered";

export function useOrderProductStatus(product: OrderProduct) {
  const [copied, setCopied] = useState(false);
  const [codeVisible, setCodeVisible] = useState(false);
  const [deliveryState, setDeliveryState] = useState<DeliveryState>("pending");
  const [storeCodeInput, setStoreCodeInput] = useState("");
  const [isStoreCodeVerified, setIsStoreCodeVerified] = useState(false);

  const maskedCode = product.code ? product.code.replace(/[^\s]/g, "*") : "";

  const handleCopyCode = () => {
    if (!product.code) return;
    navigator.clipboard.writeText(product.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelivered = () => {
    setDeliveryState("delivered");
    // TODO: API entegrasyonu — PATCH /orders/products/{id}/confirm
  };

  const handleNotDelivered = () => {
    setDeliveryState("not_delivered");
    // TODO: API entegrasyonu — POST /orders/products/{id}/dispute
  };

  const handleVerifyStoreCode = () => {
    if (!product.isDropshipping || !product.storeCode) return;
    if (storeCodeInput.trim() === product.storeCode) {
      setIsStoreCodeVerified(true);
    }
  };

  const showDeliveryCard =
    product.category === "TOP_UP" &&
    product.codeStatus === "PENDING" &&
    product.requiresActivation;

  const showCodeBox =
    product.codeStatus === "DELIVERED" &&
    product.code &&
    (!product.isDropshipping || isStoreCodeVerified);

  const showStoreCodeInput =
    product.codeStatus === "DELIVERED" &&
    product.code &&
    product.isDropshipping &&
    product.storeCode &&
    !isStoreCodeVerified;

  return {
    
    copied,
    codeVisible,
    setCodeVisible,
    deliveryState,
    storeCodeInput,
    setStoreCodeInput,
    isStoreCodeVerified,
    maskedCode,
   
    handleCopyCode,
    handleDelivered,
    handleNotDelivered,
    handleVerifyStoreCode,
  
    showDeliveryCard,
    showCodeBox,
    showStoreCodeInput,
  };
}