'use client';

import { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import { AuthResponse, LoginCredentials } from './auth.types';
import { useRouter } from 'next/navigation';
import { useAuthStore } from "@/features/auth/store/auth.store";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [formData, setFormData] = useState<LoginCredentials & { rememberMe: boolean }>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<LoginError>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    try {
      await delay(1000);
      if (formData.email === 'test@epinpay.com' && formData.password === 'epinpay') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setAuth({ id: '1', name: 'Ahmet', surname: "Yılmaz", balance: 35, epPoints: 35, email: 'test@mail.com' } as any, 'mock-token');
        router.push('/');
      } else {
        setErrors({ form: 'E-posta veya şifre hatalı!' });
      }
    } catch (error: unknown) {
      setErrors({ form: 'Bir hata oluştu.' });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData, errors, isLoading, touched,
    handleChange, handleClear, handleBlur, handleRememberMe, handleSubmit,
  };
}