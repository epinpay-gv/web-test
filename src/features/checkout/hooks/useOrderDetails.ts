import { useState, useEffect } from 'react';
import { OrderDetailResponse } from '../types';
import { orderService } from '../service';

export function useOrderDetails(orderId: string) {
  const [order, setOrder] = useState<OrderDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSecureOrder = async () => {
      if (!orderId) return;

      try {
        setIsLoading(true);
        
        // 1. LocalStorage'dan kullanıcı bilgilerini al
        const loggedInUser = JSON.parse(localStorage.getItem("user") || "null");
        const guestInfo = JSON.parse(localStorage.getItem("guest_checkout") || "null");

        // 2. Kimlik doğrulama payload'unu oluştur
        const payload = {
          order_id: orderId,
          // Eğer üye ise userId, değilse guest mailini gönder
          email: loggedInUser?.email || guestInfo?.email || "",
          userId: loggedInUser?.id
        };

        if (!payload.email) {
          throw new Error("Kullanıcı bilgisi bulunamadı.");
        }

        const data = await orderService.getOrderDetail(payload);
        setOrder(data);
      } catch (err) {
        setError("Sipariş verileri çekilemedi veya yetkisiz erişim.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSecureOrder();
  }, [orderId]);

  return { order, isLoading, error };
}