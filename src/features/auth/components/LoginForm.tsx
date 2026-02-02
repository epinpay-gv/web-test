"use client";

import React, { useState } from "react";
import { useAuthStore } from "../store/auth.store";
import { authApi } from "../service";
import { Button } from "@/components/common/Button/Button";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/features/cart/store/cart.store";
import { useNotificationStore } from "@/features/notifications/stores/notification.store";
import { MOCK_CART_ITEMS, MOCK_NOTIFICATIONS } from "@/features/notifications/mock-data";

interface AuthError {
  status?: number;
  message: string;
}

export function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authApi.login({ email, password });
      setAuth(response.user, response.token);
      useNotificationStore.getState().setNotifications(MOCK_NOTIFICATIONS);
      useCartStore.getState().setItems(MOCK_CART_ITEMS);
      router.push("/");
    } catch (error) {
      const authError = error as AuthError;
      alert(authError.message || "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 w-full max-w-sm p-8 bg-(--bg-neutral-secondary-soft) rounded-xl border border-(--border-default-medium) shadow-xl">
      <div className="space-y-2 text-center mb-6">
        <h1 className="text-2xl font-bold text-(--text-body)">Tekrar Hoş Geldin</h1>
        <p className="text-sm text-neutral-500">Hesabına giriş yaparak devam et.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-(--text-body)">E-posta</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2.5 rounded-md border bg-transparent text-(--text-body) border-(--border-default-medium) focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none"
            placeholder="ornek@mail.com"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-(--text-body)">Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2.5 rounded-md border bg-transparent text-(--text-body) border-(--border-default-medium) focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none"
            placeholder="••••••••"
            required
          />
        </div>
      </div>

      <Button 
        variant="brand" 
        text={loading ? "Giriş Yapılıyor..." : "Giriş Yap"} 
        className="w-full mt-2 py-6"
        type="submit"
        disabled={loading}
      />

      <div className="text-center mt-4">
        <button 
          type="button"
          onClick={() => router.push("/register")}
          className="text-sm text-neutral-500 hover:text-orange-500 transition-colors"
        >
          Henüz hesabın yok mu? <span className="font-semibold underline">Kayıt Ol</span>
        </button>
      </div>
    </form>
  );
}