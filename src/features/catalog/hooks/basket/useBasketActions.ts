/* eslint-disable @typescript-eslint/no-explicit-any */
// handleRequest fonkisyonundaki any'ler hata veriyordu, o yüzden eslint disabled oldu
"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { getCookie, handleRequest } from "@/lib/utils";
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
} from "../../catalog.service";

export function useBasketActions() {
  const [loading, setLoading] = useState(false);

  const openTopupModal = () => {};

  const addToCart = async (payload: AddToCartPayload) => {
    const response = await handleRequest<AddToCartResponse>(
      () => addToCartService(payload),
      "Ürün sepete eklendi", setLoading
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
    handleRequest(() => changeQuantityService(payload), "Sepet güncellendi", setLoading);

  const addToFavorites = (payload: AddToFavoritesPayload) =>
    handleRequest(() => addToFavoritesService(payload), "Favorilere eklendi", setLoading);

  const notifyWhenAvailable = (payload: NotifyWhenAvailablePayload) =>
    handleRequest(
      () => notifyWhenAvailableService(payload),
      "Stok bildirimi oluşturuldu", setLoading
    );

  return {
    addToCart,
    changeQuantity,
    addToFavorites,
    notifyWhenAvailable,
    loading,
  };
}
