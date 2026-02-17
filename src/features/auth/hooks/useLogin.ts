'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../authService';
import { useLoginStore } from '../store/login.store';
import { useAuthStore } from '../store/auth.store';
import { LoginFormData } from '../auth.types';

export function useLogin() {
  const router = useRouter();
  const store = useLoginStore();
  const loginToGlobalStore = useAuthStore((state) => state.login);

  const handleChange = (field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    store.updateFormData({ [field]: value });
  };

  const handleBlur = (field: keyof LoginFormData) => () => {
    store.setTouched(field);
  };

  const handleClear = (field: keyof LoginFormData) => () => {
    store.updateFormData({ [field]: '' });
  };

  const handleRememberMe = () => {
    store.updateFormData({ rememberMe: !store.formData.rememberMe });
  };

  const fullLogin = async (manualData?: LoginFormData) => {
    store.setIsLoading(true);
    store.setError(null);

    const credentials = manualData || store.formData;

    try {
      // ADIM 1: Firebase Token Al
      console.log('[Login] 1. Firebase token alınıyor...');
      const firebaseResponse = await authService.getFirebaseToken(credentials);

      if (!firebaseResponse.firebaseToken) {
        throw new Error('Firebase token alınamadı');
      }

      // ADIM 2: Backend Login
      console.log('[Login] 2. Backend login yapılıyor...');
      const loginResponse = await authService.loginWithFirebaseToken(firebaseResponse.firebaseToken);

      if (!loginResponse.success) {
        throw new Error(loginResponse.message || 'Giriş başarısız');
      }

      // ADIM 3: Token'ları httpOnly cookie'ye yaz (middleware okuyacak)
      if (loginResponse.token && loginResponse.refreshToken) {
        console.log('[Login] 3. Cookie ayarlanıyor...');
        await fetch('/api/auth/set-cookie', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            accessToken: loginResponse.token,
            refreshToken: loginResponse.refreshToken,
            rememberMe: credentials.rememberMe,
          }),
        });
      }

      // ADIM 4: Global store güncelle (UI için)
      if (loginResponse.user) {
        loginToGlobalStore(loginResponse.user, credentials.rememberMe);
      }

      // Remember Me → email'i kaydet
      if (credentials.rememberMe) {
        localStorage.setItem('rememberedEmail', credentials.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      console.log(`[Login] Başarılı - Remember Me: ${credentials.rememberMe}`);

      router.push('/');
      router.refresh();

    } catch (error: unknown) {
      const errorMessage = error instanceof Error
        ? error.message
        : typeof error === 'object' && error !== null && 'message' in error
        ? String((error as { message: string }).message)
        : 'Giriş yapılırken bir hata oluştu.';

      console.error('[Login] Hata:', errorMessage);
      store.setError(errorMessage);
    } finally {
      store.setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!store.formData.email || !store.formData.password) {
      store.setError('Email ve şifre gereklidir');
      return;
    }
    fullLogin();
  };

  const errors = {
    email: store.touched.email && store.error?.toLowerCase().includes('email')
      ? store.error
      : undefined,
    password: store.touched.password && store.error?.toLowerCase().includes('şifre')
      ? store.error
      : undefined,
    form: store.error,
  };

  return {
    formData: store.formData,
    isLoading: store.isLoading,
    error: store.error,
    errors,
    touched: store.touched,
    handleChange,
    handleBlur,
    handleClear,
    handleRememberMe,
    handleSubmit,
    fullLogin,
  };
}