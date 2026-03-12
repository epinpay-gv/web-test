/* eslint-disable @typescript-eslint/no-explicit-any */
// handleRequest fonkisyonundaki any'ler hata veriyordu, o yüzden eslint disabled oldu
"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { getCookie } from "@/lib/utils";
import {
  AddToCartPayload,
  AddToCartResponse,
  ChangeQuantityPayload,
  AddToFavoritesPayload,
  NotifyWhenAvailablePayload,
} from "../../catalog.types";
import {
  addToCartService,
  changeQuantityService,
  addToFavoritesService,
  notifyWhenAvailableService,
} from "../../service";

export function useBasketActions() {
  const [loading, setLoading] = useState(false);

  const handleRequest = async <T>(
    request: () => Promise<T>,
    successMessage: string,
  ): Promise<T | undefined> => {
    try {
      setLoading(true);
      const response = await request();
      toast.success(successMessage);
      return response;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Bir hata oluştu";
      toast.error(message);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const openTopupModal = () => {};

  const addToCart = async (payload: AddToCartPayload) => {
    const response = await handleRequest<AddToCartResponse>(
      () => addToCartService(payload),
      "Ürün sepete eklendi",
    );
    const existingGuestId = getCookie("X-Guest-Id");
    if (
      response?.success &&
      response.data?.cartType == "guest" &&
      !existingGuestId
    ) {
      document.cookie = `X-Guest-Id=${response.data.identifier}; path=/; max-age=2592000; SameSite=Lax`;
    }
    return response;
  };

  const changeQuantity = (payload: ChangeQuantityPayload) =>
    handleRequest(() => changeQuantityService(payload), "Sepet güncellendi");

  const addToFavorites = (payload: AddToFavoritesPayload) =>
    handleRequest(() => addToFavoritesService(payload), "Favorilere eklendi");

  const notifyWhenAvailable = (payload: NotifyWhenAvailablePayload) =>
    handleRequest(
      () => notifyWhenAvailableService(payload),
      "Stok bildirimi oluşturuldu",
    );

  return {
    addToCart,
    changeQuantity,
    addToFavorites,
    notifyWhenAvailable,
    loading,
  };
}
