'use client';

import { useState, useCallback, FormEvent } from 'react';
import { AuthResponse, LoginCredentials } from './auth.types';
import { useRouter } from 'next/navigation';

// ─── Mock delay ───
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ─── Types ───
interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginError {
  email?: string;
  password?: string;
  form?: string;
}

export function useLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<LoginError>({});
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  // ─── Validation Rules ───
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

  // ─── Validate All ───
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

  // ─── Validate On Change ───
  const validateOnChange = useCallback(
    (field: 'email' | 'password', value: string) => {
      if (!touched[field]) return;

      const error = validationRules[field](value);
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));
    },
    [touched]
  );

  // ─── Handlers ───
  const handleChange = useCallback(
    (field: 'email' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFormData((prev) => ({ ...prev, [field]: value }));
      validateOnChange(field, value);
    },
    [validateOnChange]
  );

  const handleClear = useCallback(
    (field: 'email' | 'password') => () => {
      setFormData((prev) => ({ ...prev, [field]: '' }));
      validateOnChange(field, '');
    },
    [validateOnChange]
  );

  const handleBlur = useCallback(
    (field: 'email' | 'password') => () => {
      if (!touched[field]) return;

      const error = validationRules[field](formData[field]);
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));
    },
    [formData, touched]
  );

  const handleRememberMe = useCallback(() => {
    setFormData((prev) => ({ ...prev, rememberMe: !prev.rememberMe }));
  }, []);

  // ─── Login Service (Mock) ───
  const loginService = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Gerçek API kullanımında:
    // return baseFetcher<AuthResponse, LoginCredentials>("/auth/login", {
    //   method: "POST",
    //   body: credentials,
    // });

    // MOCK SİMÜLASYONU
    await delay(1000);

    if (credentials.email === 'test@mail.com' && credentials.password === '123456') {
      return {
        user: {
          id: '1',
          name: 'Ahmet',
          surname: 'Yılmaz',
          email: 'test@mail.com',
        },
        token: 'mock-jwt-token',
      };
    }

    // eslint-disable-next-line prefer-promise-reject-errors
    throw { status: 401, message: 'E-posta veya şifre hatalı!' };
  };

  // ─── Token Yönetimi ───
  const saveAuth = (response: AuthResponse, rememberMe: boolean) => {
    if (rememberMe) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    } else {
      sessionStorage.setItem('token', response.token);
      sessionStorage.setItem('user', JSON.stringify(response.user));
    }
  };

  // ─── Submit ───
   const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await loginService({
        email: formData.email,
        password: formData.password,
      });

      console.log('Login başarılı:', response);

      // Token kaydet
      try {
        saveAuth(response, formData.rememberMe);
      } catch (storageError) {
        // localStorage/sessionStorage hata verirse devam et
        console.warn('Storage error:', storageError);
      }

      // TODO: yönlendirme
      router.push('/');
    } catch (error) {
      console.error('Login error:', error); // ← Debug için
      const apiError = error as { status: number; message: string };

      if (apiError.status === 401) {
        setErrors({ form: apiError.message });
      } else {
        setErrors({ form: 'Bir hata oluştu. Lütfen tekrar deneyin.' });
      }
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