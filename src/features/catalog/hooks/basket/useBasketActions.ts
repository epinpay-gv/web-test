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
    return await handleRequest<AddToCartResponse>(
      () => addToCartService(payload),
      "Ürün sepete eklendi", setLoading
    );
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
