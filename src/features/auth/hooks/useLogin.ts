'use client';

import { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
// Kendi dosya yollarınıza göre bu importları kontrol edin:
import { LoginCredentials, UserProfile } from '../auth.types'; 
import { authService } from '../service';
import { useAuthStore } from "@/features/auth/store/auth.store";

interface LoginError {
  email?: string;
  password?: string;
  form?: string;
}

interface TouchedState {
  email: boolean;
  password: boolean;
}

export function useLogin() {
  const router = useRouter(); // 'router' hatasını düzeltir
  const setAuth = useAuthStore((state) => state.setAuth); // 'setAuth' hatasını düzeltir

  const [formData, setFormData] = useState<LoginCredentials & { rememberMe: boolean }>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<LoginError>({}); // 'setErrors' hatasını düzeltir
  const [isLoading, setIsLoading] = useState<boolean>(false); // 'setIsLoading' hatasını düzeltir
  const [touched, setTouched] = useState<TouchedState>({
    email: false,
    password: false,
  });

  const validationRules = {
    email: (value: string): string | undefined => {
      if (!value.trim()) return 'Email zorunludur';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Geçersiz email';
      return undefined;
    },
    password: (value: string): string | undefined => {
      if (!value.trim()) return 'Şifre zorunludur';
      if (value.length < 6) return 'Şifre en az 6 karakter olmalı';
      return undefined;
    },
  };

  // 'validate' hatasını düzeltir
  const validate = useCallback((): boolean => {
    const newErrors: LoginError = {};
    const emailError = validationRules.email(formData.email);
    const passwordError = validationRules.password(formData.password);

    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    setTouched({ email: true, password: true });
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = (field: keyof LoginCredentials) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleClear = (field: keyof LoginCredentials) => () => {
    setFormData((prev) => ({ ...prev, [field]: '' }));
  };

  const handleBlur = (field: keyof TouchedState) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleRememberMe = () => {
    setFormData((prev) => ({ ...prev, rememberMe: !prev.rememberMe }));
  };
  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  if (!validate()) return;

  setIsLoading(true);
  setErrors({});

  try {
    const response = await authService.fullLogin({
      email: formData.email,
      password: formData.password
    });

    // Veri .data içinde geldiği için response.data üzerinden erişiyoruz
    const loginData = response.data; 

    if (loginData && loginData.user) {
      // Zustand store'a veriyi gönder
      setAuth(loginData.user, loginData.token);
      
      console.log("Giriş başarılı, Kullanıcı:", loginData.user);
      
      router.push('/');
      router.refresh();
    } else {
      // Eğer yapı beklediğimizden farklıysa hata fırlat
      console.error("Beklenen veri yapısı gelmedi:", response);
      throw new Error("Kullanıcı verisi ayrıştırılamadı.");
    }

  } catch (error: unknown) {
    const errorMessage = (error as { message?: string })?.message || 'Giriş başarısız.';
    setErrors({ form: errorMessage });
  } finally {
    setIsLoading(false);
  }
};

  return {
    formData,
    errors,
    isLoading,
    touched,
    handleChange,
    handleClear,
    handleBlur,
    handleRememberMe,
    handleSubmit,
  };
}