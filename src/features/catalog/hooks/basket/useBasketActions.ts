/* eslint-disable @typescript-eslint/no-explicit-any */ 
// handleRequest fonkisyonundaki any'ler hata veriyordu, o yüzden eslint disabled oldu
"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import {
  AddToCartPayload,
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

  const handleRequest = async (
    request: () => Promise<any>,
    successMessage: string,
  ) => {
    try {
      setLoading(true);
      await request(); 
      toast.success(successMessage);
    } catch (err: any) {
      toast.error(err.message || "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (payload: AddToCartPayload) =>
    handleRequest(() => addToCartService(payload), "Ürün sepete eklendi");

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
