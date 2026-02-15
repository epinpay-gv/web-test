/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../authService';
import { useRegisterStore } from '../store/useRegisterStore';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { LoginFormState } from '../auth.types';

export function useLogin() {
  const router = useRouter();
  
  // Register store'dan form verilerini ve durumları alıyoruz
  const { formData, setIsLoading, setError, updateFormData, isLoading, error } = useRegisterStore();
  
  // Ana auth store'dan login fonksiyonunu alıyoruz (Header'ı günceller)
  const loginToGlobalStore = useAuthStore((state) => state.login);

  /**
   * Input değişimlerini yönetir
   */
  const handleChange = (field: keyof LoginFormState) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    updateFormData({ [field]: value } as any);
  };

  /**
   * Input odak dışı kaldığında çalışır (Hata almamak için eklendi)
   */
  const handleBlur = (field: keyof LoginFormState) => () => {
    // İleride validation eklemek istersen burayı kullanabilirsin
    console.log(`${field} alanı blur edildi.`);
  };

  /**
   * Input içeriğini temizler
   */
  const handleClear = (field: keyof LoginFormState) => () => {
    updateFormData({ [field]: '' } as any);
  };

  /**
   * Beni Hatırla checkbox kontrolü
   */
  const handleRememberMe = () => {
    updateFormData({ rememberMe: !formData.rememberMe } as any);
  };

  /**
   * Ana Giriş Fonksiyonu
   * @param manualData - Eğer dışarıdan veri gönderilirse (Kayıt sonrası gibi) onu kullanır
   */
  const fullLogin = async (manualData?: LoginFormState) => {
    setIsLoading(true);
    setError(null);
    
    const loginEmail = manualData?.email || formData.email;
    const loginPassword = manualData?.password || formData.password;

    try {
      // 1. API İsteği (Mock veya Gerçek)
      const response = await authService.login(loginEmail, loginPassword);
      
      // 2. LocalStorage'a token kaydı
      if (response.token) {
        localStorage.setItem('auth_token', response.token);
      }

      // 3. Global Auth Store Güncelleme (Header'daki "Giriş Yap" butonunu "Profil" yapar)
      if (response.user) {
        loginToGlobalStore(response.user);
      }
      
      console.log("Giriş Başarılı:", response);
      
      // 4. Yönlendirme ve Sayfa Yenileme
      router.push('/');
      router.refresh(); 
    } catch (err: any) {
      setError(err.message || "Giriş yapılırken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Form submit edildiğinde çalışır
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fullLogin();
  };

  return {
    formData,
    isLoading,
    error, // Bu genel form hatası için (Zustand'dan gelen)
    errors: { 
      email: error?.includes('email') ? error : undefined, 
      password: error?.includes('şifre') ? error : undefined,
      form: error // Bileşen errors.form bekliyorsa burası kurtarır
    }, 
    handleChange,
    handleBlur,
    handleClear,
    handleRememberMe,
    handleSubmit,
    fullLogin,
    updateFormData,
    touched: {} as any // Eğer LoginForm 'touched' bekliyorsa hata vermesin
  };
}