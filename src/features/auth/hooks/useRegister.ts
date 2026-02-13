/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMemo, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useRegisterStore } from '../store/useRegisterStore';
import { authService } from '../authService';
import { useLogin } from './useLogin';
import { ValidationRules } from '../auth.types';

export function useRegister() {
  const router = useRouter();
  const store = useRegisterStore();
  
  // useLogin içindeki fonksiyonu alıyoruz ki kayıt sonrası otomatik giriş yapabilelim
  const { fullLogin } = useLogin();

  // Şifre Gücü Hesaplamaları
  const validationRules = useMemo((): ValidationRules => {
    const pass = store.formData.password || '';
    return {
      minLength: pass.length >= 10,
      hasNumber: /[0-9]/.test(pass),
      hasLowerCase: /[a-z]/.test(pass),
      hasUpperCase: /[A-Z]/.test(pass),
      hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
    };
  }, [store.formData.password]);

  const isPasswordSecure = useMemo(() => 
    Object.values(validationRules).every(Boolean), 
  [validationRules]);

  const strength = useMemo(() => 
    Object.values(validationRules).filter(Boolean).length * 20, 
  [validationRules]);

  // Input Değişim Yönetimi
  const handleChange = (field: keyof typeof store.formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    store.updateFormData({ [field]: e.target.value });
  };

  /**
   * ADIM 1: Kaydı Başlat (OTP Gönderme)
   */
  const handleInitiate = async (e: FormEvent) => {
    e.preventDefault();
    
    // Şifreler eşleşmiyor veya zayıfsa durdur
    if (store.formData.password !== store.formData.passwordAgain) {
      store.setError("Şifreler birbiriyle eşleşmiyor.");
      return;
    }

    if (!isPasswordSecure) {
      store.setError("Lütfen tüm şifre kriterlerini karşılayın.");
      return;
    }

    store.setIsLoading(true);
    store.setError(null);

    try {
      await authService.initiateRegister(store.formData);
      store.setStep('otp'); // OTP ekranına geç
    } catch (err: any) {
      store.setError(err.message || "Kayıt başlatılamadı.");
    } finally {
      store.setIsLoading(false);
    }
  };

  /**
   * ADIM 2: OTP Doğrula ve Otomatik Giriş Yap
   */
  const handleVerifyOtp = async (otpCode: string) => {
    store.setIsLoading(true);
    store.setError(null);

    try {
      // 1. Önce OTP'yi doğrula (Fake API verify aksiyonu)
      await authService.verifyOtp(store.formData.email, otpCode);
      
      // 2. Başarılıysa, useLogin'deki fullLogin'i tetikle.
      // Bu fonksiyon token'ı localStorage'a yazar ve Header'ı günceller.
      await fullLogin();
      
      // Not: fullLogin zaten router.push('/') ve refresh işlemlerini yapıyor.
    } catch (err: any) {
      store.setError(err.message || "Doğrulama kodu hatalı.");
    } finally {
      store.setIsLoading(false);
    }
  };

  // Inputları temizlemek için (Login formundaki gibi)
  const handleClear = (field: keyof typeof store.formData) => () => {
    store.updateFormData({ [field]: '' });
  };

  // Blur fonksiyonu (Hataları önlemek için)
  const handleBlur = (field: string) => () => {
    console.log(`${field} focus lost`);
  };

  return {
    formData: store.formData,
    step: store.step,
    isLoading: store.isLoading,
    error: store.error,
    // RegisterForm'un beklediği errors objesi yapısı
    errors: {
      form: store.error,
    },
    validationRules,
    isPasswordSecure,
    strength,
    handleChange,
    handleBlur,
    handleClear,
    handleInitiate,
    handleVerifyOtp,
    setStep: store.setStep,
  };
}