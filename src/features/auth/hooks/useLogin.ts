'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../authService';
import { useLoginStore } from '../store/login.store';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { LoginFormData } from '../auth.types';

export function useLogin() {
  const router = useRouter();
  const store = useLoginStore();
  
  // Ana auth store'dan login fonksiyonunu alıyoruz (Header'ı günceller)
  const loginToGlobalStore = useAuthStore((state) => state.login);

  /**
   * Input değişimlerini yönetir
   */
  const handleChange = (field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    store.updateFormData({ [field]: value });
  };

  /**
   * Input odak dışı kaldığında çalışır
   */
  const handleBlur = (field: keyof LoginFormData) => () => {
    store.setTouched(field);
  };

  /**
   * Input içeriğini temizler
   */
  const handleClear = (field: keyof LoginFormData) => () => {
    store.updateFormData({ [field]: '' });
  };

  /**
   * Beni Hatırla checkbox kontrolü
   */
  const handleRememberMe = () => {
    store.updateFormData({ rememberMe: !store.formData.rememberMe });
  };

  /**
   * Ana Giriş Fonksiyonu (2 Adımlı: Firebase Token + Backend Login)
   */
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

      console.log('[Login] 2. Firebase token alındı:', firebaseResponse.firebaseToken.substring(0, 20) + '...');

      // ADIM 2: Firebase Token ile Backend Login
      console.log('[Login] 3. Backend login yapılıyor...');
      const loginResponse = await authService.loginWithFirebaseToken(firebaseResponse.firebaseToken);
      
      if (!loginResponse.success) {
        throw new Error(loginResponse.message || 'Giriş başarısız');
      }

      console.log('[Login] 4. Login başarılı:', loginResponse);

      // Token'ı localStorage'a kaydet
      if (loginResponse.token) {
        localStorage.setItem('authToken', loginResponse.token);
      }

      // Global Auth Store Güncelleme (Header'daki "Giriş Yap" → "Profil")
      if (loginResponse.user) {
        loginToGlobalStore(loginResponse.user);
      }

      // Remember Me işlemi
      if (credentials.rememberMe) {
        localStorage.setItem('rememberedEmail', credentials.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      console.log('[Login] 5. Yönlendiriliyor...');
      
      // Yönlendirme
      router.push('/');
      router.refresh();
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : typeof error === 'object' && error !== null && 'message' in error
        ? String((error as { message: string }).message)
        : "Giriş yapılırken bir hata oluştu.";
      
      console.error('[Login] Hata:', errorMessage);
      store.setError(errorMessage);
    } finally {
      store.setIsLoading(false);
    }
  };

  /**
   * Form submit edildiğinde çalışır
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Basit validasyon
    if (!store.formData.email || !store.formData.password) {
      store.setError('Email ve şifre gereklidir');
      return;
    }

    fullLogin();
  };

  // Errors objesi oluştur (component beklediği format)
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