"use client";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useLogin } from "@/features/auth/hooks/useLogin";

export function useOrderAuth(email: string, isAgreed: boolean, onAuthenticated: () => void) {
  const user = useAuthStore((state) => state.user);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [errors, setErrors] = useState<{ email?: boolean; agreement?: boolean }>({});

  const loginHook = useLogin(() => {
    setIsAuthOpen(false);
    setTimeout(() => onAuthenticated(), 300);
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePaymentProcess = async () => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setErrors({ email: !user?.email && !isEmailValid, agreement: !isAgreed });

    if (!isAgreed || (!user?.email && !isEmailValid)) return;

    if (!user?.email) {
      // Örn: Backend kontrolü simülasyonu
      const isRegistered = ["test@example.com"].includes(email.toLowerCase());
      if (isRegistered) {
        setIsAuthOpen(true);
        return;
      }
    }
    onAuthenticated();
  };

  return { isAuthOpen, setIsAuthOpen, isMobile, errors, setErrors, handlePaymentProcess, loginHook };
}