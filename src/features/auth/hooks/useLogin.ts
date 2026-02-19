'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../authService';
import { AuthResponse, LoginFormData, UserProfile } from '../auth.types';
import { useAuthStore } from '../store/auth.store';

interface LoginState {
  formData: LoginFormData;
  errors: Partial<LoginFormData & { form: string }>;
  touched: Partial<Record<keyof LoginFormData, boolean>>;
  isLoading: boolean;
}

function validateEmail(email: string): string | undefined {
  if (!email.trim()) return 'E-posta adresi zorunludur.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Geçerli bir e-posta adresi girin.';
  return undefined;
}

function validatePassword(password: string): string | undefined {
  if (!password) return 'Şifre zorunludur.';
  if (password.length < 6) return 'Şifre en az 6 karakter olmalıdır.';
  return undefined;
}

function validateAll(formData: LoginFormData): Partial<LoginFormData> {
  return {
    email: validateEmail(formData.email),
    password: validatePassword(formData.password),
  };
}

export function useLogin() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login); 
  
  const [state, setState] = useState<LoginState>({
    formData: { email: '', password: '', rememberMe: false },
    errors: {},
    touched: {},
    isLoading: false,
  });

  const performLogin = useCallback((user: UserProfile, rememberMe: boolean, token?: string) => {
    login(
      {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '',
        role: user.role || 'user',
        epPoints: user.epPoints || 0,
        balance: user.balance || 0,
        id: user.uid || user.id || ''
      },
      rememberMe
    );

    if (token) {
      localStorage.setItem('sessionToken', token);
    }

    router.push('/');
  }, [login, router]);

  const handleChange = useCallback(
    (field: keyof LoginFormData) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setState((prev) => {
          const newFormData = { ...prev.formData, [field]: value };
          const errors = prev.touched[field]
            ? {
                ...prev.errors,
                email:
                  prev.touched.email
                    ? validateEmail(newFormData.email)
                    : prev.errors.email,
                password:
                  prev.touched.password
                    ? validatePassword(newFormData.password)
                    : prev.errors.password,
              }
            : prev.errors;
          return { ...prev, formData: newFormData, errors };
        });
      },
    []
  );

  const handleBlur = useCallback(
    (field: keyof LoginFormData) => () => {
      setState((prev) => {
        const newTouched = { ...prev.touched, [field]: true };
        const errors = {
          ...prev.errors,
          [field]:
            field === 'email'
              ? validateEmail(prev.formData.email)
              : validatePassword(prev.formData.password),
        };
        return { ...prev, touched: newTouched, errors };
      });
    },
    []
  );

  const handleClear = useCallback(
    (field: keyof LoginFormData) => () => {
      setState((prev) => ({
        ...prev,
        formData: { ...prev.formData, [field]: '' },
        errors: { ...prev.errors, [field]: undefined },
      }));
    },
    []
  );

  const handleRememberMe = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, rememberMe: e.target.checked },
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const errors = validateAll(state.formData);
      setState((prev) => ({
        ...prev,
        touched: { email: true, password: true },
        errors,
      }));

      const hasErrors = Object.values(errors).some(Boolean);
      if (hasErrors) return;

      setState((prev) => ({ ...prev, isLoading: true, errors: {} }));

      try {
        const response = await authService.login({
          email: state.formData.email,
          password: state.formData.password,
          rememberMe: state.formData.rememberMe,
        });

        if (response.user) {
          performLogin(response.user, state.formData.rememberMe, response.token);
        }

        setState((prev) => ({ ...prev, isLoading: false }));
      } catch (err: unknown) {
        const code = err instanceof Error ? err.message : 'UNKNOWN_ERROR';
        setState((prev) => ({
          ...prev,
          isLoading: false,
          errors: { form: mapFirebaseError(code) },
        }));
      }
    },
    [state.formData, performLogin]
  );

  const handleGoogleLogin = useCallback(async (): Promise<void> => {
    setState((prev) => ({ ...prev, isLoading: true, errors: {} }));
    try {
      const response: AuthResponse = await authService.loginWithGoogle();
      if (response.user) {
        performLogin(response.user, true, response.token);
      }
    } catch (err: unknown) {
      const code = err instanceof Error ? err.message : 'UNKNOWN_ERROR';
      setState((prev) => ({
        ...prev,
        isLoading: false,
        errors: { form: mapFirebaseError(code) },
      }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [performLogin]);

  return {
    ...state,
    handleChange,
    handleBlur,
    handleClear,
    handleRememberMe,
    handleSubmit,
    performLogin,
    handleGoogleLogin
  };
}

function mapFirebaseError(code: string): string {
  const errorMap: Record<string, string> = {
    'auth/invalid-email': 'Geçersiz e-posta adresi.',
    'auth/user-disabled': 'Bu hesap devre dışı bırakılmıştır.',
    'auth/user-not-found': 'E-posta veya şifre hatalı.',
    'auth/wrong-password': 'E-posta veya şifre hatalı.',
    'auth/invalid-credential': 'E-posta veya şifre hatalı.',
    'auth/too-many-requests': 'Çok fazla başarısız deneme. Hesabınız kilitlendi.',
    'auth/network-request-failed': 'İnternet bağlantınızı kontrol edin.',
  };

  const matched = Object.keys(errorMap).find(key => code.includes(key));
  return matched ? errorMap[matched] : 'Giriş başarısız. Lütfen tekrar deneyin.';
}